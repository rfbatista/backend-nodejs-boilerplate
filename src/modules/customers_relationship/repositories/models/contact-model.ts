import Contact from "@modules/customers_relationship/entities/contact";
import Address from "core/value-object/Address";
import Email from "core/value-object/Email";
import { sequelize } from "infrastructure/data-source/sequelize";
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from "sequelize";

class ContactModel extends Model<
  InferAttributes<ContactModel>,
  InferCreationAttributes<ContactModel>
> {
  declare id: string;
  declare first_name: string;
  declare last_name: string;
  declare job_title: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare phone: CreationOptional<string>;
  declare notes: CreationOptional<string>;
  declare street: CreationOptional<string>;
  declare city: CreationOptional<string>;
  declare postal_code: CreationOptional<string>;
  declare state: CreationOptional<string>;
  declare country: CreationOptional<string>;
  declare created_at: NonAttribute<Date>;
  declare updated_at: NonAttribute<Date>;
  declare deleted_at: NonAttribute<Date>;

  static fromEntity(entity: Contact) {
    return ContactModel.build({
      id: entity.id.toString(),
      first_name: entity.firstName,
      last_name: entity.lastName,
      job_title: entity.jobTitle,
      email: entity.email.toString(),
      phone: entity.phone,
      notes: entity.notes,
      street: entity.address.street,
      city: entity.address.city,
      postal_code: entity.address.postalCode,
      state: entity.address.state,
      country: entity.address.country,
    });
  }

  toEntity(): Contact {
    const email = Email.create(this.email);
    const address = Address.create({
      city: this.city,
      street: this.street,
      postalCode: this.postal_code,
      state: this.state,
      country: this.country,
    });
    const result = Contact.create(
      {
        firstName: this.first_name,
        lastName: this.last_name,
        jobTitle: this.job_title,
        email: email.getValue(),
        address: address.getValue(),
        phone: this.phone,
        notes: this.notes,
        createdAt: this.created_at,
        updatedAt: this.updated_at,
        deletedAt: this.deleted_at,
      },
      this.id
    );
    if(result.isFailure) return;
    return result.getValue()
  }
}

ContactModel.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    job_title: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    notes: { type: DataTypes.STRING },
    street: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    postal_code: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
export default ContactModel;
