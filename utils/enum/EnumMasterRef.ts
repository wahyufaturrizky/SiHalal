export enum MasterRef {
  JNFAS,
  legaldocs = "JNLGL",
  factorystatus = "STFAS",
}

export const findRefType = (input: any): string => {
  return MasterRef[input as keyof typeof MasterRef].toString();
};
