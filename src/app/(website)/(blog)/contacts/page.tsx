// import PageHeader from "@/components/page-header";
import ContactsForm from "@/components/contacts-form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact With Us",
  description:
    "Want to partner, have questions, or just say hello? Drop us a message through the form and the Display team will get back to you. Let's collaborate and build the future of on-chain experiences together.",
  openGraph: {
    images: [
      {
        url: "/contacts.jpg",
        width: 1380,
        height: 840,
        alt: "Display — Contacts page cover",
      },
    ],
    title: "Contact Display — Shape the Future of On-Chain Experiences",
    description:
      "Reach out to the Display team to explore partnerships and on-chain innovation.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Display — Shape the Future of On-Chain Experiences",
    description:
      "Have questions or want to collaborate? Let's build the future together.",
    images: ["/contacts.jpg"],
  },
};

export default function ContactsPage() {
  return (
    <div className="blog-post-page__container blog-post-page__container--contacts">
      <div className="blog-post-page__post">
        <Image
          src={"/contacts.jpg"}
          alt="Contacts image"
          width={730}
          height={438}
          className="blog-post-page__image"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="blog-post-page__category">Get in Touch</div>
        <h1>Shape the Future of On-Chain Experiences with Display</h1>

        <p>
          Looking to partner or have questions about the app? Our team is ready
          to collaborate — reach out and let's build the future together.
        </p>
      </div>
      <ContactsForm />
    </div>
  );
}
