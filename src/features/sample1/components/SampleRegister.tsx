import { Button } from "@/components/ui/button";
import { FormDateTimePicker } from "@/components/ui/datetime-picker";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { FormTextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AuthorityType } from "@/types";
import { authorityTypeStr } from "@/types/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SmapleRegister = ({
  className,
  setTabIndex,
}: {
  className?: string;
  setTabIndex: (value: string) => void;
}) => {
  const formSchema = z.object({
    lastName: z.string().max(30).trim().optional(),
    firstName: z.string().max(30).trim().optional(),
    mail: z.string().trim().optional(),
    statusType: z.nativeEnum(AuthorityType).optional(),
    birthDay: z.date().optional(),
    profile: z.string().max(200),
    description: z.string().max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      mail: "",
      statusType: undefined,
      birthDay: new Date(),
      profile: "",
      description: "",
    },
  });
  return (
    <div
      className={cn(
        "p-3 h-[calc(100vh-80px)] flex flex-col space-y-2 w-1/2",
        className
      )}
    >
      <div className="text-2xl font-bold">利用者登録</div>
      <Form {...form}>
        <form>
          <div className="flex gap-2">
            <FormInput control={form.control} name="lastName" label="苗字 *" />
            <FormInput control={form.control} name="firstName" label="名前 *" />
          </div>
          <FormDateTimePicker
            control={form.control}
            name="birthDay"
            label="生年月日 *"
            displayFormat={{ hour24: "yyyy/MM/dd", hour12: "yyyy/MM/dd" }}
          />
          <FormInput
            control={form.control}
            name="mail"
            label="メールアドレス *"
          />
          <FormTextarea
            control={form.control}
            name="profile"
            label="プロフィール"
          />
          <FormSelect
            control={form.control}
            name="statusType"
            label="権限 *"
            items={Object.values(AuthorityType).map((value) => ({
              value,
              textValue: authorityTypeStr(value),
            }))}
            required
          />
          <FormTextarea
            control={form.control}
            name="description"
            label="備考"
          />
          <div className="flex gap-2 mt-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => {
                if (window.confirm("入力内容を破棄しますか？")) {
                  form.reset();
                  setTabIndex("sampleList");
                }
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => {
                if (window.confirm("登録してもよろしいですか？")) {
                  form.reset();
                  setTabIndex("sampleList");
                }
              }}
            >
              登録
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
