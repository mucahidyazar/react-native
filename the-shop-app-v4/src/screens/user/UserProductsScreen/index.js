import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Button,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../constants/colors";
import { deleteProduct } from "../../../store/actions";
import ProductItem from "../../../views/components/Shop/ProductItem";
import HeaderButton from "../../../views/ui/HeaderButton";

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const editProductHandler = (id) => {
    navigation.navigate({
      routeName: "EditProduct",
      params: {
        productId: id,
      },
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={colors.primary}
            title="Delete"
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navData.navigation.navigate({
                routeName: "EditProduct",
              });
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
