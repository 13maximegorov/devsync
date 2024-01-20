import { RefObject, useEffect, useState } from 'react';

interface ChatScrollProps {
  chatRef: RefObject<HTMLDivElement>;
  bottomRef: RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const chatDiv = chatRef.current;

    const handleScroll = () => {
      const scrollTop = chatDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    chatDiv?.addEventListener('scroll', handleScroll);

    return () => {
      chatDiv?.removeEventListener('scroll', handleScroll);
    };
  }, [chatRef, loadMore, shouldLoadMore]);

  useEffect(() => {
    const bottomDiv = bottomRef.current;
    const chatDiv = chatRef.current;

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!chatDiv) {
        return false;
      }

      const distanceFromBottom =
        chatDiv.scrollHeight - chatDiv.scrollTop - chatDiv.clientHeight;

      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomDiv?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [bottomRef, chatRef, hasInitialized, count]);
};
