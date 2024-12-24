const defaultStatus = { color: "error", desc: "Unknown Status" };
export const statusItemPelakuUsaha = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF11: { color: "success", desc: "Verification" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF280: { color: "error", desc: "Returned to PU" },
    OF285: { color: "error", desc: "Returned By KF" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);
