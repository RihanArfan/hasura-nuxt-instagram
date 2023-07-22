export default function () {
  return useState<boolean>("isCreatePostOpen", () => false);
}
