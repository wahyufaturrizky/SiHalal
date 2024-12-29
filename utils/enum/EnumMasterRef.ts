export enum MasterRef {
  JNFAS = "JNFAS",
  legaldocs = "JNLGL",
  factorystatus = "STFAS",
  busscale = "JNUSH",
  bustype = "JNBUS",
  jnlay = "JNLAY",
  jnpro = "JNPRO",

  CHANL = "CHANL",

  STOFF = "STOFF",
}

export const findRefType = (input: any): string => {
  return MasterRef[input as keyof typeof MasterRef].toString();
};
