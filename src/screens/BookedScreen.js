import React, { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { useSelector } from "react-redux";
import { PostList } from "../components/PostList";

export const BookedScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate("Post", {
      postId: post.id,
      postDate: new Date(post.date).toLocaleDateString(),
      booked: post.booked
    });
  };

  const data = useSelector(state => state.post.bookedPosts);

  return (
    <PostList
      onOpen={openPostHandler}
      data={data.filter(post => post.booked)}
    />
  );
};

BookedScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Избранное",
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle Drawer"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
});
