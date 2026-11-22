import { materialRenderers } from "@jsonforms/material-renderers";
import { customRenderers } from "@components/graviola/renderers";
import { graviolaRenderers } from "@graviola/semantic-json-form";
import { MarkdownTextFieldRenderer, markdownTester } from "@graviola/edb-markdown-renderer";


export const allRenderers = [
  ...materialRenderers,
  ...graviolaRenderers,
  { tester: markdownTester, renderer: MarkdownTextFieldRenderer },
  ...customRenderers,
];

