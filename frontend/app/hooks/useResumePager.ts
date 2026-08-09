import { useState, useRef } from "react";
import { FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const PEEK = 75;
export const PAGE_WIDTH = screenWidth - PEEK;

export function useResumePager() {
  const [currentPage, setCurrentPage] = useState(0);

  const resumeListRef = useRef<FlatList>(null);
  const namesListRef = useRef<FlatList>(null);

  const scrollToPage = (index: number) => {
    setCurrentPage(index);
    resumeListRef.current?.scrollToIndex({ index, animated: true });
    namesListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5, // keep selected name centered
    });
  };

  const onResumeScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH);
    if (page !== currentPage) {
      setCurrentPage(page);
      namesListRef.current?.scrollToIndex({
        index: page,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  return {
    currentPage,
    resumeListRef,
    namesListRef,
    scrollToPage,
    onResumeScrollEnd,
    PAGE_WIDTH,
  };
}