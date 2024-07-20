import {
    Button,
    ButtonProps,
    CopyButton,
    Drawer,
    Flex,
    Modal,
    Paper,
    Stack,
    Text,
    TextInput,
    Tooltip
} from "@mantine/core";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconCheck,
    IconCode,
    IconCopy,
    IconMail
} from "@tabler/icons-react";
import { ICampaign } from "../types";
import { useMediaQuery } from "@mantine/hooks";

interface IProps {
    campaign?: ICampaign
    iconSize: number
    opened: boolean
    onClose: () => void
}

const ShareModal = ({ campaign, iconSize, ...others }: IProps) => {
    const matchesMobile = useMediaQuery('(max-width: 768px)');

    const buttonProps: ButtonProps = {
        variant: "light",
        color: 'secondary'
    }

    return (
        (matchesMobile ?
            <Drawer title="Ayuda compartiendo" position="bottom" {...others}>
                <Stack>
                    <Text>Las campañas compartidas en redes sociales recaudan hasta 5 veces más.</Text>
                    <Paper>
                        <Flex align="flex-end" gap="sm">
                            <TextInput
                                label="Copiar Enlace"
                                value={`https://givers.cl/campaign/${campaign?.id}`}
                                disabled
                                sx={{ flex: '1 1 auto' }} />
                            <CopyButton value={`https://givers.cl/campaign/${campaign?.id}`} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip label={copied ? 'Copiado' : 'Copiar'} withArrow position="right">
                                        <Button
                                            color={copied ? 'green' : 'gray'}
                                            leftIcon={copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                                            onClick={copy}>
                                            {copied ? 'Copiado' : 'Copiar'}
                                        </Button>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Flex>
                    </Paper>
                </Stack>
            </Drawer> :
            <Modal title="Ayuda compartiendo" centered size="md" {...others}>
                <Stack>
                    <Text>Las campañas compartidas en redes sociales recaudan hasta 5 veces más.</Text>
                    <Paper>
                        <Flex align="flex-end" gap="sm">
                            <TextInput
                                label="Copiar Enlace"
                                value={`https://givers.cl/campaign/${campaign?.id}`}
                                disabled
                                sx={{ flex: '1 1 auto' }} />
                            <CopyButton value={`https://givers.cl/campaign${campaign?.id}`} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip label={copied ? 'Copiado' : 'Copiar'} withArrow position="right">
                                        <Button
                                            color={copied ? 'green' : 'gray'}
                                            leftIcon={copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                                            onClick={copy}>
                                            {copied ? 'Copiado' : 'Copiar'}
                                        </Button>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Flex>
                    </Paper>
                </Stack>
            </Modal>
        )
    );
};

export default ShareModal;
