import { InvalidEmailError } from "@core/errors/EmailErrors";
import { Result } from "@core/result";
import { UseCase } from "@core/usecase";
import Address from "@core/value_objects/Address";
import Email from "@core/value_objects/Email";
import Contact from "../entities/contact";
import ContactRepository from "../repositories/contact-repo";

type Input = {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  email?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  phone?: string;
  notes?: string;
};

type Output = void;

export default class CreateContactUseCase implements UseCase<Input, Output> {
  constructor(private contactRepo: ContactRepository) {}

  async execute(input: Input): Promise<Result<Error> | Result<Output>> {
    const emailOrError = Email.create(input.email);
    if (emailOrError.isFailure) {
      return Result.fail(new InvalidEmailError()) as Result<Error>;
    }
    const addressResult = Address.create({
      city: input.city,
      street: input.street,
      postalCode: input.postalCode,
      state: input.state,
      country: input.country,
    });
    const contactResult = Contact.create({
      firstName: input.firstName,
      lastName: input.lastName,
      jobTitle: input?.jobTitle,
      email: emailOrError.getValue(),
      address: addressResult.getValue(),
      phone: input?.phone,
      notes: input?.notes,
    });
    try {
      await this.contactRepo.save(contactResult.getValue())
      return Result.ok(null)
    } catch(error) {
      return Result.fail(error) as Result<Error>
    }

  }
}
