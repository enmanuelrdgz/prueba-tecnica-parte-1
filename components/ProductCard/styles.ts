import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    overflow: 'hidden', // Ensures children respect border radius
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // Makes the image container square
    backgroundColor: '#f8f9fa', // Fallback background while image loads
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 12,
    minHeight: 70, // Ensures consistent card height even with short product names
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 6,
    lineHeight: 18, // Improves text readability
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff', // Blue color to make price stand out
  },
});

export default styles;