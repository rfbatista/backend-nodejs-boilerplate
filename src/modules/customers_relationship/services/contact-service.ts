import Address from "@core/value-object/Address";
import Email from "@core/value-object/Email";
import Contact from "../entities/contact";
import ContactRepository from "../repositories/contact-repo";

export default class ContactService {
  constructor(private contactRepo: ContactRepository) {}

  async createContact(input: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    city?: string;
    street?: string;
    postalCode?: string;
    state?: string;
    country?: string;
    address: string;
    phone: string;
    notes: string;
  }) {
    const emailOrError = Email.create(input.email);
    if (emailOrError.isFailure) {
      throw emailOrError.errorValue();
    }
    const addressOrError = Address.create({
      city: input?.city,
      street: input?.street,
      postalCode: input?.postalCode,
      state: input?.state,
    });
    const contact = Contact.create({
      firstName: input.firstName,
      lastName: input.lastName,
      jobTitle: input.jobTitle,
      email: emailOrError.getValue(),
      address: addressOrError.getValue(),
      phone: input.phone,
      notes: input.notes,
    });
    if (contact.isFailure) {
      return contact.errorValue();
    }
    await this.contactRepo.save(contact.getValue());
  }
  updateContact() {}
  removeContact() {}
}
