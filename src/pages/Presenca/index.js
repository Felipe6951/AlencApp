import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { Stagger, IconButton, useDisclose, HStack, Box, Center } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Presenca() {

  const {
    isOpen,
    onToggle
  } = useDisclose();

  return (
    <SafeAreaView>
      <StatusBar />
      <Text>Hello world</Text>
      <Center>
        <Box alignItems="center" minH="220">
          <Stagger visible={isOpen} initial={{
            opacity: 0,
            scale: 0,
            translateY: 34
          }} animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true
              }
            }
          }} exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true
              }
            }
          }}>
            <IconButton mb="4" variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<MaterialIcons size={20} name="location-pin" color="warmGray.50" />} />
          </Stagger>
        </Box>
        <HStack alignItems="center">
          <IconButton variant="solid" borderRadius="full" size="lg" onPress={onToggle} bg="cyan.400" icon={<MaterialIcons size={20} color="warmGray.50" name="dots-horizontal"/> } />
        </HStack>
      </Center>
    </SafeAreaView >
  );
}