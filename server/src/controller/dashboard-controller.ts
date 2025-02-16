import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/v1/dashboard
export async function getPromotorDashboard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const promotorId = Number(req.params.promotorId); // Ambil dari parameter URL
    if (!promotorId) {
      res.status(400).json({ message: "Promotor ID is required." });
      return;
    }

    // 1) Ambil data promotor langsung
    const promotor = await prisma.promotor.findUnique({
      where: { id: promotorId },
      include: {
        Event: {
          include: {
            Attendee: true, // Mengambil daftar attendee
            PromotorTrans: true, // Mengambil transaksi
          },
        },
      },
    });

    if (!promotor) {
      res.status(404).json({ message: "Promotor not found." });
      return;
    }

    // 2) Hitung total attendees & revenue dari event promotor ini
    let totalAttendees = 0;
    let totalRevenue = 0;

    promotor.Event.forEach((event) => {
      totalAttendees += event.Attendee.length;

      // Jumlahkan pendapatan dari transaksi event ini
      const eventRevenue = event.PromotorTrans.reduce((sum, tx) => {
        return sum + Number(tx.amount);
      }, 0);
      totalRevenue += eventRevenue;
    });

    // 3) Mengambil semua pendaftaran berdasarkan event milik promotor
    const allRegs = await prisma.registration.findMany({
      where: {
        event: {
          promotorId: promotor.id,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    // Fungsi untuk format tanggal
    function getYearMonthDay(date: Date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // 0-based index
        day: date.getDate(),
      };
    }

    // Statistik harian
    const dailyStats: Record<string, number> = {};
    allRegs.forEach((reg) => {
      const { year, month, day } = getYearMonthDay(reg.createdAt);
      const key = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      dailyStats[key] = (dailyStats[key] || 0) + 1;
    });

    // Statistik bulanan
    const monthlyStats: Record<string, number> = {};
    allRegs.forEach((reg) => {
      const { year, month } = getYearMonthDay(reg.createdAt);
      const key = `${year}-${String(month).padStart(2, "0")}`;
      monthlyStats[key] = (monthlyStats[key] || 0) + 1;
    });

    // Statistik tahunan
    const yearlyStats: Record<string, number> = {};
    allRegs.forEach((reg) => {
      const { year } = getYearMonthDay(reg.createdAt);
      yearlyStats[year] = (yearlyStats[year] || 0) + 1;
    });

    // 4) Kembalikan data sebagai response
    res.status(200).json({
      promotor: {
        id: promotor.id,
        fullName: promotor.fullName,
        email: promotor.email,
      },
      events: promotor.Event, // daftar event
      totalEvents: promotor.Event.length,
      totalAttendees,
      totalRevenue,
      stats: {
        daily: dailyStats,
        monthly: monthlyStats,
        yearly: yearlyStats,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: "Error fetching Promotor Dashboard" });
  }
}
