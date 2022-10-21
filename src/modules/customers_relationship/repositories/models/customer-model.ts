import hash from "core/hash";
import { sequelize } from "infrastructure/data-source/sequelize";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

class CustomerModel extends Model<InferAttributes<CustomerModel>, InferCreationAttributes<CustomerModel>>{
  declare id: CreationOptional<string>;
  declare name: string;
  declare identity_document: CreationOptional<string>;
  declare salt: CreationOptional<string>
}

CustomerModel.init(
  {
    id: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    identity_document: { type: DataTypes.STRING },
    salt: { type: DataTypes.STRING }
  },
  {
    hooks: {
      beforeCreate: async (customer) => {
        if (customer.identity_document) {
          const result = await hash(customer.identity_document);
          customer.identity_document = result.hash;
          customer.salt = result.salt;
        }
      },
      beforeUpdate: async (customer) => {
        if (customer.identity_document) {
          const result = await hash(customer.identity_document);
          customer.identity_document = result.hash;
          customer.salt = result.salt;
        }
      },
    },
    sequelize,
  }
);

export default CustomerModel;
