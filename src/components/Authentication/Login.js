import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history=useHistory();
    const toast=useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState();
    const [loading,setLoading]=useState(false);

  const HandleClick = () => {
    setShow(!show);
  };
  const submitHandler = async() => {
    if( !password || !email ){
      toast({
        title: 'Please Fill All The Fileds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      });
      setLoading(false);
      return
    }
    try {
      const config={
        headers:{
          "Content-type":'application/json',
        }
      }
      const {data}=await axios.post("http://localhost:9000/api/user/login",{password,email},config);
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chat");
      setLoading(false)
    } catch (error) {
      
    }
  };
  return <VStack>
    <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem" onClick={HandleClick}>
            <Button h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="blue"
        width="100%"
        backgroundColor='red'
        style={{ marginTop: 15 }}
        onClick={()=>{
            setEmail("guest@example.com");
            setPassword("123456")
        }}
      >
        Login With Guest Account
      </Button>

  </VStack>;
};

export default Login;
