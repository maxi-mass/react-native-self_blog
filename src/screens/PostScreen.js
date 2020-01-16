import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { THEME } from "../theme";
import { toggleBooked, removePost } from "../store/actions/postActions";

export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const postId = navigation.getParam("postId");
  const post = useSelector(state =>
    state.post.allPosts.find(p => p.id === postId)
  );

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [post, dispatch]);

  const booked = useSelector(state =>
    state.post.bookedPosts.some(p => p.id === postId)
  );
  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);
  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  const removeHandler = () => {
    Alert.alert(
      "Удаление поста",
      "Вы точно хотите удалить пост?",
      [
        {
          text: "Отменить",
          style: "cancel"
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            navigation.navigate("Main");
            dispatch(removePost(postId));
          }
        }
      ],
      { cancelable: false }
    );
  };
  if (!post) return null;
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: post.img }} />
      <View style={styles.postWrap}>
        <View>
          <Text style={styles.title}>{post.text}</Text>
        </View>
        <Button
          title="Remove post"
          color={THEME.DANGER_COLOR}
          onPress={removeHandler}
        />
      </View>
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const postId = navigation.getParam("postId");
  const postDate = navigation.getParam("postDate");
  const booked = navigation.getParam("booked");
  const toggleHandler = navigation.getParam("toggleHandler");
  const iconName = booked ? "ios-star" : "ios-star-outline";

  return {
    headerTitle: `Post: ${postId} ${postDate}`,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title="Take photo" iconName={iconName} onPress={toggleHandler} />
      </HeaderButtons>
    )
    // headerStyle: {
    //   backgroundColor: 'red'
    // },
    // headerTintColor: '#fff'
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  postWrap: {
    padding: 10
  },
  title: {
    fontFamily: "play-regular"
  }
});
