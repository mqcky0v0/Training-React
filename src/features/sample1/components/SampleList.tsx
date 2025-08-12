import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { escapeRegExp } from "@/lib/format";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { authorityTypeStr } from "@/types/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SampleUserDetail } from "./SampleUserDetail";
import { testUsers } from "./testDate";

export const SampleList = ({ className }: { className?: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterUsers, setFilterUsers] = useState<User[]>([]);
  const [openDialogUserDetail, setOpenDialogUserDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const formSchema = z.object({
    keyword: z.string().max(30).trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  // ユーザー取得
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const result = testUsers;
    setUsers(result);
    setFilterUsers(result);
  };

  const onSearch = useCallback(
    (value: z.infer<typeof formSchema>) => {
      if (!users) {
        setFilterUsers([]);
        return;
      }

      let list = users;
      if (value.keyword) {
        const regex = new RegExp(`.*${escapeRegExp(value.keyword)}.*`, "i");
        list = list.filter(
          (u) =>
            regex.test(u.userId) || regex.test(u.name) || regex.test(u.email)
        );
      }
      setFilterUsers(list);
    },
    [users]
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      onSearch(value as z.infer<typeof formSchema>);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onSearch]);

  return (
    <div
      className={cn(
        "p-3 h-[calc(100vh-80px)] flex flex-col space-y-2",
        className
      )}
    >
      <div className="font-bold text-2xl">利用者一覧</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearch)}>
          <FormInput
            name="keyword"
            control={form.control}
            label="キーワード"
            className="w-[20vw]"
            placeholder="検索"
          />
        </form>
      </Form>
      <ScrollArea className="flex-grow">
        <Table className="w-1/2 bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ユーザーID</TableHead>
              <TableHead>氏名</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>権限</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterUsers.length > 0 ? (
              filterUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell
                    className="cursor-pointer text-blue-600 hover:text-blue-800 underline"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenDialogUserDetail(true);
                    }}
                  >
                    {user.userId}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge>{authorityTypeStr(user.statusType)}</Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="p-2 text-gray-500">
                    <span>情報が登録されていません</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex justify-end text-xs text-muted-foreground">
                  検索結果 {filterUsers.length}件
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
      <Dialog
        open={openDialogUserDetail}
        onOpenChange={setOpenDialogUserDetail}
      >
        <DialogContent>
          <DialogHeader>利用者詳細</DialogHeader>
          {selectedUser && <SampleUserDetail user={selectedUser} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
