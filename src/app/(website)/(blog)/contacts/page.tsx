// import PageHeader from "@/components/page-header";
import ContactsForm from "@/components/contacts-form";
import Image from "next/image";

export default function ContactsPage() {
  return (
    <div className="blog-post-page__container blog-post-page__container--contacts">
      <div className="blog-post-page__post">
        <Image
          src={"/contacts-picture.png"}
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
