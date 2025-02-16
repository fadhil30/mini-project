import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPromotions = async (req, res) => {
    try {
      const promotions = await prisma.promotion.findMany();
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch promotions' });
    }
  };
  
  export const createPromotion = async (req, res) => {
    const { promotionCode, title, description, discount, eventId } = req.body;
    try {
      const promotion = await prisma.promotion.create({
        data: {
          promotionCode,
          title,
          description,
          discount,
          eventId,
        },
      });
      res.status(201).json(promotion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create promotion' });
    }
  };