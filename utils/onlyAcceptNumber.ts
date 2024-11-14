export default (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.value = target.value.replace(/\D/g, "");
};
