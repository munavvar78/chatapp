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

const SignUp = () => {
  const toast = useToast()
  const history=useHistory();
  const [show, setShow] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading,setLoading]=useState(false);
  const HandleClick = () => {
    setShow(!show);
  };
  const postDetails = (pics) => {
    
    setLoading(true)
    if(pics===undefined){
      toast({
        title: 'Please Select an Image!',
        description: "We've created your account for you.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    if(pics.type==="image/jpeg" || pics.type==="image/png"){
      const data=new FormData();
      data.append("file",pics);
      data.append("upload_preset","munavvar");
      data.append("cloud_name","dxb1zjd4v")
      fetch("https://api.cloudinary.com/v1_1/dxb1zjd4v/image/upload",{
        method:"post",body:data
      }).then((res)=>res.json())
      .then(data=>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
      })
    }
    else{
      toast({
        title: 'Please Select an Image!',
        description: "We've created your account for you.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  };
  const submitHandler = async() => {
    setLoading(true);
    if(!name || !password || !email || !confirmpassword){
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
      const {data}=await axios.post("http://localhost:9000/api/user",{name,password,email,confirmpassword,pic},config);
      toast({
        title: 'Registration Successful',
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
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>confirmPassword</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your ConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem" onClick={HandleClick}>
            <Button h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
