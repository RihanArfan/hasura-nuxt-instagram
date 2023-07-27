export default function () {
  return useState<string>("adminSecret", () => "");
}
