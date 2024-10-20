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
import usePreviewImg from "../../hooks/usePreviewImg";
import useAuthStore from "../../store/authStore";
import useUploadImage from "../../hooks/useUploadImg";
import useEditProfile from "../../hooks/useEditProfile";

const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setCaption] = useState("");
	const authUser=useAuthStore((state)=>state.user);
	const imageRef = useRef(null);
    const { imageUrl, handleImageChange, setImageUrl } = usePreviewImg(authUser?.imageURL || null);
    const uploadImage = useUploadImage("postPic");
	const [selectedFile, setSelectedFile] = useState(null);
	const {isUpdating,editProfile}=useEditProfile({ path: "postPic" });

	const handleImageChangeWrapper = (e) => {
		const file = e.target.files[0];
		if (file) {
			handleImageChange(e); 
			setSelectedFile(file); 
		}
	};

	const handlePostCreation = async () => {
		try {
		  let uploadedImageUrl = "";
	
		  // 이미지 업로드 처리
		  if (selectedFile) {
			uploadedImageUrl = await uploadImage(selectedFile);
		  }
	
		  // 새 게시물 데이터 생성
		  const newPost = {
			postId: Date.now().toString(), // 고유 ID 생성
			caption: caption || "",
			imageURL: uploadedImageUrl,
			createdAt: new Date().toISOString(),
		  };
	
		  // editProfile 호출로 posts 배열 업데이트
		  await editProfile({}, selectedFile, newPost);
	
		  // 초기화 및 모달 닫기
		  setCaption("");
		  setSelectedFile(null);
		  setImageUrl(null);
		  onClose();
		} catch (error) {
		  console.error("Image upload failed:", error);
		}
	  };

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
										setImageUrl(null);
										imageRef.current.value = "";
									}}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isUpdating}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;
