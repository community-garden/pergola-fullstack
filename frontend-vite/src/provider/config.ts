import { materialRenderers } from "@jsonforms/material-renderers";
import { customRenderers } from "@components/graviola/renderers";
import { graviolaRenderers } from "@graviola/semantic-json-form";


export const allRenderers = [
  ...materialRenderers,
  ...graviolaRenderers,
  ...customRenderers,
];

