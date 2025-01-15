import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Shopify shop ID
  name: { type: String, required: true },
  email: { type: String },
  domain: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
  country: { type: String },
  currency: { type: String },
  shop_owner: { type: String },
  plan_name: { type: String },
  phone: { type: String },
  initial_suggestions: { type: Array },
  initial_message: { type: String },
  delivery_description: { type: String },
  shop_description: { type: String },
  general_information: { type: String },
  returns_policy: { type: String },
  primary_color: { type: String },
  secondary_color: { type: String },
  FAQs: { type: String },
  test_mode: { type: Boolean }
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
