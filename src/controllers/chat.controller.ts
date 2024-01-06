import { Request, Response } from "express";
import OpenAI from "openai";
import BusinessInfo from "../models/businessInfo.model";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGptResponse(req: Request, res: Response): Promise<void> {
  const userQuery = req.body.query as string;

  const businessInfo = await BusinessInfo.findOne();

  if (!businessInfo || !businessInfo.isCustomized) {
    res.status(503).json({
      message:
        "Chat service is currently unavailable. Please customize your business information.",
    });
    return;
  }

  const prompt = `
    You are a knowledgeable customer support agent for a company. Here is some information about the company:
    ${`- Company name: ${businessInfo?.companyName}`}
    ${
      businessInfo?.openingHours
        ? `- Opening Hours: ${businessInfo.openingHours}`
        : "Arent set yet"
    }
    ${`- Contact Info: Phone - ${businessInfo?.contactInfo.phone}, Email - ${businessInfo?.contactInfo.email}`}
    ${
      businessInfo?.contactInfo?.address
        ? `Address - ${businessInfo.contactInfo.address}`
        : "Arent set yet"
    }
    ${
      businessInfo?.productDetails
        ? `- Product Details: ${businessInfo.productDetails}`
        : "Arent set yet"
    }
    ${
      businessInfo?.pricingInfo
        ? `- Pricing Info: ${businessInfo.pricingInfo}`
        : "Arent set yet"
    }
    ${
      businessInfo?.returnPolicy
        ? `- Return Policy: ${businessInfo.returnPolicy}`
        : "Arent set yet"
    }
    ${
      businessInfo?.shippingInfo
        ? `- Shipping Info: ${businessInfo.shippingInfo}`
        : "Arent set yet"
    }
    ${
      businessInfo?.companyHistory
        ? `- Company History: ${businessInfo.companyHistory}`
        : "Arent set yet"
    }
    ${
      businessInfo?.promotions
        ? `- Promotions: ${businessInfo.promotions}`
        : "Arent set yet"
    }
    ${
      businessInfo?.loyaltyPrograms
        ? `- Loyalty Programs: ${businessInfo.loyaltyPrograms}`
        : "Arent set yet"
    }
    ${
      businessInfo?.safetyCompliance
        ? `- Safety Compliance: ${businessInfo.safetyCompliance}`
        : "Arent set yet"
    }
    ${
      businessInfo?.accessibilityInfo
        ? `- Accessibility Info: ${businessInfo.accessibilityInfo}`
        : "Arent set yet"
    }
    ${
      businessInfo?.emergencyProcedures
        ? `- Emergency Procedures: ${businessInfo.emergencyProcedures}`
        : "Arent set yet"
    }
    ${
      businessInfo?.communityInvolvement
        ? `- Community Involvement: ${businessInfo.communityInvolvement}`
        : "Arent set yet"
    }
    ${
      businessInfo?.environmentalImpact
        ? `- Environmental Impact: ${businessInfo.environmentalImpact}`
        : "Arent set yet"
    }
    ${
      businessInfo?.technicalSupportInfo
        ? `- Technical Support Info: ${businessInfo.technicalSupportInfo}`
        : "Arent set yet"
    }
    ${
      businessInfo?.appointmentBookingInfo
        ? `- Appointment Booking Info: ${businessInfo.appointmentBookingInfo}`
        : "Arent set yet"
    }
    ${
      businessInfo?.faqs?.length
        ? `- FAQs:\n  ${businessInfo.faqs
            .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
            .join("\n  ")}`
        : "Arent set yet"
    }

    Customer: "${userQuery}"
    Support Agent:
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const botResponse = completion.choices[0].message.content;

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Error in getting response from GPT:", error);
    res.status(500).send("Error in processing your request.");
  }
}

export { getChatGptResponse };
