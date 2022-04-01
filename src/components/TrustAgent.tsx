import { Button, Group, Modal, Space, Stack, TextInput } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { Ad4mContext } from '..';
import { showNotification } from '@mantine/notifications';

type Props = {
  candidate: string,
  handleTrustAgent: (candidate: string) => void,
}

const TrustAgent = (props: Props) => {
  const ad4mClient = useContext(Ad4mContext);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
  }, []);

  const addTrustedAgent = async () => {
    let agents = await ad4mClient.runtime.addTrustedAgents([props.candidate]);
    closeModal();
    showNotification({
      message: 'Great, the agent is trusted now! 🤥',
    })
    console.log("agent is now trusted: ", agents);
  }

  const closeModal = () => {
    props.handleTrustAgent("");
  }

  return (
    <div>
      <Modal
        size="lg"
        opened={opened}
        onClose={() => closeModal()}
        title="Trust Agent"
      >
        <Stack>
          <TextInput
            defaultValue={props.candidate}
            label="Agent DID"
            disabled
          />
          <Group>
            <Button variant="outline" onClick={() => closeModal()}>
              Close
            </Button>
            <Space h="md" />
            <Button onClick={addTrustedAgent}>
              Trust Agent
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  )
}

export default TrustAgent