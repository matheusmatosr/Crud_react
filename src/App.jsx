import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box, 
  Flex,
  Button, 
  useDisclosure, 
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];
    
    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };
  
  return (
    <>
      <Text mt={20} mb={0} ml={400} fontSize="35px" fontWeight="semibold">Um simples CRUD:</Text>
      <Flex
        h="100%"
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
      >
        <Box w="750px" h="550px" mt={0}>
          <Button mb={10} ml={600} colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
            Novo Cadastro
          </Button>

          <Box overflow="auto" height="350px" backgroundColor="beige">
            <Table mt="5">
              <Thead>
                <Tr borderColor="black">
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    Nome
                  </Th> 
                  <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                    Email
                  </Th> 
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(({ name, email }, index) => (
                  <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                    <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        onClick={() => [
                          setDataEdit({name, email, index}),
                          onOpen(),
                        ]}
                      />
                    </Td>
                      
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(email)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {isOpen && (
          <ModalComp 
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
          />
        )}
      </Flex>
      <Text ml="650px">@ 2023 by <a href="https://www.linkedin.com/in/matheus-matos-1a523221b/">Matheus Matos</a></Text>
    </>
  );
}

export default App;
