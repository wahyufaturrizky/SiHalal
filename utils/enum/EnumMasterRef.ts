export enum MasterRef {
  JNFAS = "JNFAS",
  legaldocs = "JNLGL",
  factorystatus = "STFAS",
  busscale = "JNUSH",
  bustype = "JNBUS",
}

export const findRefType = (input: any): string => {
  return MasterRef[input as keyof typeof MasterRef].toString();
};
