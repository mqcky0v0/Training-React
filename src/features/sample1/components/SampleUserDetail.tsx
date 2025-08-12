import { Button } from "@/components/ui/button";
import { LabelText } from "@/components/ui/label";
import { formatDay } from "@/lib/date";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { authorityTypeStr } from "@/types/i18n";

export const SampleUserDetail = ({
  className,
  user,
}: {
  className?: string;
  user: User;
}) => {
  return (
    <div className={cn("p-3 h-[60vh] flex flex-col space-y-2", className)}>
      <div className="flex justify-between">
        <div className="font-bold text-2xl">利用者詳細</div>
        <div className="flex items-end">
          <Button className="w-[8vw]">編集</Button>
        </div>
      </div>
      <LabelText label={"ユーザーID"}>{user.userId}</LabelText>
      <LabelText label={"氏名"}>{user.name}</LabelText>
      <LabelText label={"生年月日"}>{formatDay(user.birthDay)}</LabelText>
      <LabelText label={"メールアドレス"}>{user.email}</LabelText>
      <LabelText label={"プロフィール"}>{user.profile}</LabelText>
      <LabelText label={"権限"}>{authorityTypeStr(user.statusType)}</LabelText>
      <LabelText label={"備考"}>{user.description}</LabelText>
    </div>
  );
};
