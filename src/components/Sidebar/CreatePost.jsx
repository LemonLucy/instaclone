import {
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import useCreatePost from "../../hooks/useCreatePost";
import useShowToast from "../../hooks/useShowToast";
import usePreviewImg from "../../hooks/usePreviewImg";

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [selectedFile, setSelectedFile] = useState(null);
	const imageRef = useRef(null);
	const { createNewPost, isUpdating }=useCreatePost();
	const showToast=useShowToast();
	const { imageUrl, handleImageChange } = usePreviewImg(null);
	const [caption,setCaption]=useState("")

	const handleImageChangeWrapper = (e) => {
		const file = e.target.files[0];
		if (file) {
			handleImageChange(e);
		  	setSelectedFile(file);
		}    
	  };

	const handleCreatePost=async() =>{
		try {
			await createNewPost(caption, selectedFile);
			onClose();
			setSelectedFile(null);
			setCaption("");
			if (imageRef.current) imageRef.current.value = "";
		}catch(error){
			showToast("Error", error.message, "error");
		}
	}

	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea
							placeholder='Post caption...'
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>

						<BsFillImageFill
							onClick={() => imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>

						<Input type='file' hidden ref={imageRef} onChange={handleImageChangeWrapper} />

						{imageUrl && (
							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
								<Image src={imageUrl} alt='Selected img' />
								<CloseButton
									position={"absolute"}
									top={2}
									right={2}
									onClick={() => {
										setSelectedFile(null);
										imageRef.current.value = "";
									}}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handleCreatePost} isLoading={isUpdating}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
