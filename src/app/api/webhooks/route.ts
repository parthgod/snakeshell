import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { OrderReceivedEmailHtml } from "@/components/emails/OrderReceivedEmail";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) return new Response("Invalid signature", { status: 400 });

    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) throw new Error("Missing user email");

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || { userId: null, orderId: null };

      if (!userId || !orderId) throw new Error("Invalid request metadata");

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
        },
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "parthgenius.gps@gmail.com",
          pass: "szktlhaxuvxzehco",
        },
      });

      const mailOptions = {
        from: "SnakeShell <parthgenius.gps@gmail.com>",
        to: event.data.object.customer_details.email,
        subject: "Thanks for your order",
        text: "Email content",
        html: OrderReceivedEmailHtml({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          //@ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            city: shippingAddress!.city!,
            country: shippingAddress!.country!,
            postalCode: shippingAddress!.postal_code!,
            street: shippingAddress!.line1!,
            state: shippingAddress!.state,
          },
        }),
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 });
  }
}
