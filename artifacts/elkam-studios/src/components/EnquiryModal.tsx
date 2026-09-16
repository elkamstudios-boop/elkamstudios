import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useSubmitEnquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  designation: string;
}

const EMPTY: FormState = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  designation: "",
};

const inputClass =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FF9A00]/60 focus:bg-white/8 transition-all";
const inputClassCompact =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FF9A00]/60 focus:bg-white/8 transition-all";
const labelClass =
  "block text-white/60 text-xs font-semibold tracking-wide uppercase mb-1.5";

interface FormBodyProps {
  form: FormState;
  errors: Partial<FormState>;
  isPending: boolean;
  onChange: (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  compact?: boolean;
}

const FormBody: React.FC<FormBodyProps> = ({ form, errors, isPending, onChange, onSubmit, compact }) => {
  const ic = compact ? inputClassCompact : inputClass;
  return (
    <form onSubmit={onSubmit} className={compact ? "mt-3 flex flex-col gap-2.5" : "mt-6 flex flex-col gap-4"} noValidate>
      <div>
        <label className={labelClass}>
          Full Name <span className="text-[#FF9A00]">*</span>
        </label>
        <input
          className={ic}
          placeholder="Your full name"
          value={form.fullName}
          onChange={onChange("fullName")}
          disabled={isPending}
        />
        {errors.fullName && (
          <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Phone Number <span className="text-[#FF9A00]">*</span>
        </label>
        <input
          className={ic}
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={onChange("phone")}
          type="tel"
          disabled={isPending}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Email Address <span className="text-[#FF9A00]">*</span>
        </label>
        <input
          className={ic}
          placeholder="you@company.com"
          value={form.email}
          onChange={onChange("email")}
          type="email"
          disabled={isPending}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Company Name</label>
        <input
          className={ic}
          placeholder="Your company (optional)"
          value={form.company}
          onChange={onChange("company")}
          disabled={isPending}
        />
      </div>

      <div>
        <label className={labelClass}>Designation</label>
        <input
          className={ic}
          placeholder="Your role (optional)"
          value={form.designation}
          onChange={onChange("designation")}
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className={`${compact ? "mt-1 py-2.5" : "mt-2 py-3"} w-full bg-[#FF9A00] hover:bg-[#e88a00] text-[#06040E] font-bold rounded-full text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:scale-100`}
      >
        {isPending ? "Submitting…" : "Confirm"}
      </Button>
    </form>
  );
};

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const { toast } = useToast();
  const mutation = useSubmitEnquiry();
  const isMobile = useIsMobile();

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.email.trim()) next.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    mutation.mutate(
      {
        data: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          company: form.company.trim() || null,
          designation: form.designation.trim() || null,
        },
      },
      {
        onSuccess: () => {
          setForm(EMPTY);
          setErrors({});
          onClose();
          toast({
            title: "Query submitted!",
            description: "Our executives will reach out to you shortly.",
            duration: 5000,
          });
        },
        onError: () => {
          toast({
            title: "Something went wrong",
            description: "Please try again or email us directly.",
            variant: "destructive",
            duration: 5000,
          });
        },
      },
    );
  };

  const handleClose = () => {
    if (mutation.isPending) return;
    setForm(EMPTY);
    setErrors({});
    onClose();
  };

  const formProps: FormBodyProps = {
    form,
    errors,
    isPending: mutation.isPending,
    onChange: handleChange,
    onSubmit: handleSubmit,
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(v) => !v && handleClose()} shouldScaleBackground={false}>
        <DrawerContent className="bg-[#0E0A1A] border-t border-white/10 text-white px-5 pb-6">
          <DrawerHeader className="px-0 pt-2 pb-0 text-left">
            <DrawerTitle className="font-serif text-xl font-black text-white mb-1">
              Book a Free Call
            </DrawerTitle>
            <p className="text-white/45 text-sm">
              Tell us a little about yourself and we'll be in touch shortly.
            </p>
          </DrawerHeader>
          <FormBody {...formProps} compact />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="bg-[#0E0A1A] border border-white/10 rounded-2xl text-white max-w-md w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-black text-white mb-1">
            Book a Free Call
          </DialogTitle>
          <p className="text-white/45 text-sm">
            Tell us a little about yourself and we'll be in touch shortly.
          </p>
        </DialogHeader>
        <FormBody {...formProps} />
      </DialogContent>
    </Dialog>
  );
};
