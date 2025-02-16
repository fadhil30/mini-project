import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export async function CreateTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { eventId, promotion, coupon, point } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Please login first!" });
      return;
    }

    // Check if event exists
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const event = await prisma.event.findUnique({ where: { id: +eventId } });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    // Get buyer (reader) and post owner (author)
    const buyer = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { Wallet: true, Coupon: true, Point: true },
    });

    if (!buyer) {
      res.status(401).json({ message: "Buyer ID not found" });
      return;
    }

    const promotor = await prisma.promotor.findUnique({
      where: { id: event.promotorId },
    });
    if (!promotor) {
      res.status(401).json({ message: "Promotor ID not found" });
      return;
    }

    // Check if valid voucher/promotion used
    let finalPrice = event.ticketPrice.toNumber();

    if (promotion && finalPrice > 0) {
      const validPromotion = await prisma.promotion.findUnique({
        where: {
          promotionCode: promotion,
          stock: { gt: 0 },
          expiredDate: { gt: new Date() },
        },
      });
      if (!validPromotion) {
        res.status(400).json({ message: "Invalid promotion" });
        return;
      }
      finalPrice =
        finalPrice - finalPrice * (validPromotion.discountRate / 100);
      await prisma.promotion.update({
        where: { promotionCode: promotion },
        data: { stock: { decrement: 1 } },
      });
    }

    // Check if valid coupon used
    if (coupon && finalPrice > 0) {
      const validCoupon = await prisma.coupon.findUnique({
        where: { code: coupon, used: false, expiredDate: { gt: new Date() } },
      });
      if (!validCoupon) {
        res.status(400).json({ message: "Invalid coupon" });
        return;
      }
      finalPrice = finalPrice - finalPrice * (validCoupon.discountRate / 100);

      await prisma.coupon.update({
        where: { code: coupon },
        data: { used: true },
      });
    }

    // Check if valid points used
    if (point && finalPrice > 0) {
      const validPoints = await prisma.point.findUnique({
        where: { id: req.user.id, balance: { gt: 0 } },
      });
      if (!validPoints) {
        res.status(400).json({ message: "Invalid points" });
        return;
      }
      const maxPointToUse = Math.min(point, finalPrice);

      finalPrice = finalPrice - maxPointToUse;

      await prisma.point.update({
        where: { id: req.user.id },
        data: { balance: validPoints.balance - maxPointToUse },
      });
    }

    // Check if buyer have enough balance
    if (
      buyer.Wallet?.balance &&
      buyer.Wallet?.balance.toNumber() < finalPrice
    ) {
      res.status(400).json({ message: "Insufficient balance" });
      return;
    }

    // Perform transaction
    await prisma.wallet.update({
      where: { userId: req.user.id },
      data: { balance: { decrement: finalPrice } },
    });
    await prisma.wallet.update({
      where: { id: event.id },
      data: { balance: { increment: finalPrice } },
    });
    // Record transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: req.user.id,
        eventId: event.id,
        amount: finalPrice,
      },
    });

    const ticket = await prisma.ticket.create({
      data: {
        ticketCode: `TICKET-${event.id}-${String(new Date().getTime()).slice(
          0,
          5
        )}`,
        totalPrice: finalPrice,
        transactionId: transaction.id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error creating transaction" });
  }
}

export async function GetTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: +req.params.id },
    });
    res.status(200).json({ ok: true, data: transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error fetching transaction" });
  }
}
