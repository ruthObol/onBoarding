import { useUserStore } from "@/src/client/stores/user-store";
import { Button, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { NewPostForm } from "../../create/NewPostForm";

export const AddNewPost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userName = useUserStore(state => state.userName);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return <><Tooltip
        label={!userName ? 'You must be logged in to create a post' : ''}
        disabled={!!userName}>
        <Button
            leftSection={<IconPlus size={16} />}
            onClick={openModal}
            variant='filled'
            color='blue'
            disabled={!userName}
        >
            Add New Post
        </Button>
    </Tooltip>
        {userName && (
            <NewPostForm
                opened={isModalOpen}
                onClose={closeModal}
            />
        )}
    </>
}