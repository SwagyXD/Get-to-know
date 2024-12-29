import React, { useState, useEffect } from "react";
import { useStateFragment } from "react";
import NewMessageInput from "./NewMessageInput";
import {
    PaperClipIcon,
    PhotoIcon,
    PaperAirplaneIcon,
    FaceSmileIcon,
    HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ conversation = null }) => {
    const [newMessage, setNewMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [chosenFiles, setChosenFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onFileChange = (ev) => {
        const file = ev.target.files;
        const updatedFiles = [...files].map((file) => {
            return {
                file: file,
                url: URL.createObjectURL(file),
            };
        });

        setChosenFiles((prevFiles) => {
            return [...prevFiles, ...updatedFiles];
        });
    };

    const onLikeClick = () => {
        if (messageSending) {
            return;
        }
        setNewMessage("👍");
    };

    // const onFileChange = (ev) =>{
    //     const file = ev.target.files;

    //     const updatedFile =
    // }

    const onSendClick = () => {
        if (messageSending) {
            return;
        }

        if (newMessage.trim() === "") {
            setInputErrorMessage(
                "Please provide a message or upload attachments."
            );
            setTimeout(() => {
                setInputErrorMessage("");
            }, 3000);
            return;
        }

        const formData = new FormData();
        chosenFiles.forEach((file) => {
            formData.append("attachments[]", file.file);
        });
        formData.append("message", newMessage);

        if (conversation.is_user) {
            formData.append("receiver_id", conversation.id);
        } else if (conversation.is_group) {
            formData.append("group_id", conversation.id);
        }

        setMessageSending(true);
        axios
            .post(route("message.store"), formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    console.log(`Upload Progress: ${progress}%`);
                    setUploadProgress(progress);
                },
            })
            .then((response) => {
                setNewMessage("");
                setMessageSending(false);
                console.log("Message sent successfully:", response.data);
                updateMessagesList(response.data.message);
                setUploadProgress(0);
                setChosenFiles([]);
            })
            .catch((error) => {
                setMessageSending(false);
                setChosenFiles([]);
                const message = error?.response?.data?.message;
                setInputErrorMessage(
                    message || "Failed to send message. Please try again."
                );
            });
    };

    return (
        <div className="flex flex-wrap items-start border-t border-slate-700 py-3">
            <div className="order-2 flex-1 xs:flex-none xs:order-1 p-2">
                <button className="p-1 text-gray-400 hover:text-gray-300 relative">
                    <PaperClipIcon className="w-6" />
                    <input
                        type="file"
                        multiple
                        className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                        onChange={onFileChange}
                    />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-300 relative">
                    <PhotoIcon className="w-6" />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                        onChange={onFileChange}
                    />
                </button>
            </div>
            <div className="order-1 px-3 xs:p-0 xs:order-2 flex-1 min-w-[220px] basis-full xs:basis-0 relative">
                <div className="flex ">
                    <NewMessageInput
                        value={newMessage}
                        onSend={onSendClick}
                        onChange={(ev) => setNewMessage(ev.target.value)}
                    />
                    <button
                        onClick={onSendClick}
                        className="btn btn-info rounded-l-none"
                        disabled={messageSending}
                    >
                        <PaperAirplaneIcon className="w-6" />
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </div>
                {!!uploadProgress && (
                    <progress
                        className="progress progress-info w-full"
                        value={uploadProgress}
                        max="100"
                    ></progress>
                )}
                {inputErrorMessage && (
                    <p className="text-red-500 text-sm mt-1">
                        {inputErrorMessage}
                    </p>
                )}
            </div>
            <div className="order-3 xs:order-3 p-2 flex">
                <Popover className="relative">
                    <PopoverButton className="p-1 text-gray-400 hover:text-gray-300">
                        <FaceSmileIcon className="w-6 h-6" />
                    </PopoverButton>
                    <PopoverPanel className="absolute z-10 right-0 bottom-full">
                        <EmojiPicker
                            theme="dark"
                            onEmojiClick={(ev) => {
                                setNewMessage(newMessage + ev.emoji);
                            }}
                        />
                    </PopoverPanel>
                </Popover>
                <button
                    onClick={onLikeClick}
                    className="p-1 text-gray-400 hover:text-gray-300"
                >
                    <HandThumbUpIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
