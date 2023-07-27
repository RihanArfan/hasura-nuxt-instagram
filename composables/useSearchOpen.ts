export default function () {
  return useState<boolean>("isSearchOpen", () => false);
}
