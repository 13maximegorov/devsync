'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModalStore } from '@/hooks/useModalStore';
import { ServerWithMembersWithUsers } from '@/types/types';
import { MemberRole } from '@prisma/client';
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react';

interface ServerHeaderProps {
  server: ServerWithMembersWithUsers;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModalStore();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus:outline-none"
        asChild
      >
        <button className="flex h-12 w-full items-center border-b border-border px-3 font-bold transition hover:bg-accent">
          {server.name}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', { server })}
            className="cursor-pointer px-3 py-2 text-indigo-500 focus:text-indigo-500"
          >
            Пригласить людей
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('editServer', { server })}
            className="cursor-pointer px-3 py-2"
          >
            Настройки сервера
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('members', { server })}
            className="cursor-pointer px-3 py-2"
          >
            Управлять участниками
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('createChannel')}
            className="cursor-pointer px-3 py-2"
          >
            Создать канал
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('deleteServer', { server })}
            className="cursor-pointer px-3 py-2 text-rose-500 focus:text-rose-500"
          >
            Удалить сервер
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('leaveServer', { server })}
            className="cursor-pointer px-3 py-2 text-rose-500 focus:text-rose-500"
          >
            Покинуть сервер
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
