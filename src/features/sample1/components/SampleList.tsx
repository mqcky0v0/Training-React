import { Badge } from "@/components/ui/badge";
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
import { AuthorityType, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// DBからの取得データを想定
const testUsers: User[] = [
  {
    userId: "yamada_taro",
    name: "山田 太郎",
    email: "yamada.taro@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "suzuki_hanako",
    name: "鈴木 花子",
    email: "suzuki.hanako@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "sato_ichiro",
    name: "佐藤 一郎",
    email: "sato.ichiro@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "tanaka_mina",
    name: "田中 美奈",
    email: "tanaka.mina@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "kato_jun",
    name: "加藤 純",
    email: "kato.jun@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "shimizu_hiroko",
    name: "清水 弘子",
    email: "shimizu.hiroko@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "takahashi_ryota",
    name: "高橋 涼太",
    email: "takahashi.ryota@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "nakagawa_emiko",
    name: "中川 恵美子",
    email: "nakagawa.emiko@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "fujimoto_kenta",
    name: "藤本 健太",
    email: "fujimoto.kenta@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "hirata_sakura",
    name: "平田 桜",
    email: "hirata.sakura@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "oda_shunsuke",
    name: "織田 俊介",
    email: "oda.shunsuke@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "yamamoto_naomi",
    name: "山本 直美",
    email: "yamamoto.naomi@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "matsuda_kouichi",
    name: "松田 公一",
    email: "matsuda.kouichi@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "hosokawa_rika",
    name: "細川 理香",
    email: "hosokawa.rika@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "nakamura_hiroshi",
    name: "中村 博",
    email: "nakamura.hiroshi@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "uchida_megumi",
    name: "内田 恵",
    email: "uchida.megumi@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "sasaki_toshio",
    name: "佐々木 敏夫",
    email: "sasaki.toshio@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "kawasaki_akiko",
    name: "川崎 明子",
    email: "kawasaki.akiko@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "ishikawa_yuuta",
    name: "石川 優太",
    email: "ishikawa.yuuta@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "murakami_mina",
    name: "村上 美奈",
    email: "murakami.mina@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "kitagawa_haruto",
    name: "北川 晴翔",
    email: "kitagawa.haruto@example.com",
    statusType: AuthorityType.USER,
  },
  {
    userId: "hayashi_chihiro",
    name: "林 千尋",
    email: "hayashi.chihiro@example.com",
    statusType: AuthorityType.ADMIN,
  },
  {
    userId: "morita_masaru",
    name: "森田 勝",
    email: "morita.masaru@example.com",
    statusType: AuthorityType.USER,
  },
];

export const SampleList = ({ className }: { className?: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterUsers, setFilterUsers] = useState<User[]>([]);

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
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge>{user.statusType}</Badge>
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
    </div>
  );
};
