/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';

import {
  TamaguiProvider,
  createTamagui,
  Adapt,
  Button,
  Dialog,
  Input,
  Paragraph,
  Sheet,
  Unspaced,
  View,
  XStack,
  styled,
  Text,
  PopoverProps,
  Popover,
  YStack,
  SheetProps,
  H2,
} from 'tamagui';
import {defaultConfig} from '@tamagui/config/v4';

const config = createTamagui(defaultConfig);

// 피그마랑 동일하게 구현하기
// tamagui 쓸 때는 직접 컴포넌트를 불러오지 않는다.
// 1. 토큰 사용하지 않고 직접 적는다. 시스템 없이 진행한다.
// 직접 구현한다 -> 하나씩 다 넣는다.
// 2. 토큰 사용한다.
//

function App(): React.JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <View width={200}>
        <TextLayout>Input</TextLayout>
        <XStack alignItems="center">
          {/* input을 단독으로 쓰면 height가 쭈그러듬 */}
          <Input flex={1} size="$3" placeholder="placeholder" />
        </XStack>
        <TextLayout>Button</TextLayout>
        <XStack alignItems="center">
          <Button size="$3">Lorem ipsum</Button>
        </XStack>
        <TextLayout>Dialog</TextLayout>

        <DialogTest />
        <TextLayout>Popover(작동안됨)</TextLayout>
        {/*
    android에서 작동하지 않는 오류가 있음.
    https://github.com/tamagui/tamagui/pull/3057 */}
        <PopoverDemo />
        <TextLayout>Sheet</TextLayout>
        <SheetDemo />
      </View>
    </TamaguiProvider>
  );
}

const TextLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <View>
      <Text fontSize="$7" marginBottom="$2" marginTop="$4">
        {children}
      </Text>
    </View>
  );
};

const DialogTest = () => {
  return (
    <View>
      <DialogInstance />
    </View>
  );
};

function DialogInstance({disableAdapt}: {disableAdapt?: boolean}) {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>
          <Button.Text>
            Show Dialog{disableAdapt ? ' (No Sheet)' : ''}
          </Button.Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          backgroundColor="$shadow6"
          animateOnly={['transform', 'opacity']}
          padding={5}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{opacity: 0}}
          exitStyle={{opacity: 0}}
        />

        <Dialog.FocusScope focusOnIdle>
          <Dialog.Content
            width="90%"
            bordered
            paddingVertical="$4"
            paddingHorizontal="$6"
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'tooltip',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{x: 0, y: 20, opacity: 0}}
            exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
            gap="$4">
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>

            <Unspaced>
              <Dialog.Close asChild>
                <TestButton position="absolute" right="$3" size="$2" circular>
                  닫기
                </TestButton>
              </Dialog.Close>
            </Unspaced>
          </Dialog.Content>
        </Dialog.FocusScope>
      </Dialog.Portal>
    </Dialog>
  );
}

export function PopoverDemo() {
  const [shouldAdapt, setShouldAdapt] = useState(true);
  return (
    <YStack gap="$4">
      <Popover size="$5" allowFlip placement="right">
        <Popover.Trigger asChild>
          <Button>클릭</Button>
        </Popover.Trigger>

        {shouldAdapt && (
          <Adapt platform="touch">
            <Sheet animation="medium" modal dismissOnSnapToBottom>
              <Sheet.Frame padding="$4">
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay
                backgroundColor="$shadowColor"
                animation="lazy"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
              />
            </Sheet>
          </Adapt>
        )}

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{y: -10, opacity: 0}}
          exitStyle={{y: -10, opacity: 0}}
          x={10}
          width={50}
          height={50}
          padding="$2">
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
          <Text>내용</Text>
        </Popover.Content>
      </Popover>
    </YStack>
  );
}

const spModes = ['percent', 'constant', 'fit', 'mixed'] as const;

export const SheetDemo = () => {
  const [position, setPosition] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(true);
  const [innerOpen, setInnerOpen] = React.useState(false);
  const [snapPointsMode, setSnapPointsMode] =
    React.useState<(typeof spModes)[number]>('percent');
  const isPercent = snapPointsMode === 'percent';
  const snapPoints = [85, 50, 25];

  return (
    <>
      <YStack gap="$4">
        <XStack
          gap="$4"
          $maxMd={{flexDirection: 'column', alignItems: 'center'}}>
          <Button onPress={() => setOpen(true)}>Open</Button>
        </XStack>
      </YStack>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        snapPointsMode={snapPointsMode}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium">
        <Sheet.Overlay
          animation="lazy"
          backgroundColor="$shadow6"
          enterStyle={{opacity: 0}}
          exitStyle={{opacity: 0}}
        />

        {/* <Sheet.Handle /> */}
        <Sheet.Frame
          padding="$4"
          justifyContent="center"
          alignItems="center"
          gap="$5">
          <SheetContents
            {...{modal, isPercent, innerOpen, setInnerOpen, setOpen}}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

// in general good to memoize the contents to avoid expensive renders during animations
const SheetContents = React.memo(
  ({modal, isPercent, innerOpen, setInnerOpen, setOpen}: any) => {
    return (
      <>
        <Button size="$6" circular onPress={() => setOpen(false)}>
          닫기
        </Button>
        {modal && isPercent && (
          <>
            <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} />
            <Button size="$6" circular onPress={() => setInnerOpen(true)}>
              열기
            </Button>
          </>
        )}
      </>
    );
  },
);

function InnerSheet(props: SheetProps) {
  return (
    <Sheet
      animation="medium"
      modal
      snapPoints={[90]}
      dismissOnSnapToBottom
      {...props}>
      <Sheet.Overlay
        animation="medium"
        background="$shadow2"
        enterStyle={{opacity: 0}}
        exitStyle={{opacity: 0}}
      />

      <Sheet.Handle />
      <Sheet.Frame
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$5">
        <Sheet.ScrollView>
          <YStack padding="$5" gap="$8">
            <Button
              size="$6"
              circular
              alignSelf="center"
              onPress={() => props.onOpenChange?.(false)}
            />

            <H2>Hello world</H2>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Paragraph key={i} size="$8">
                Eu officia sunt ipsum nisi dolore labore est laborum laborum in
                esse ad pariatur. Dolor excepteur esse deserunt voluptate labore
                ea. Exercitation ipsum deserunt occaecat cupidatat consequat est
                adipisicing velit cupidatat ullamco veniam aliquip reprehenderit
                officia. Officia labore culpa ullamco velit. In sit occaecat
                velit ipsum fugiat esse aliqua dolor sint.
              </Paragraph>
            ))}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}

export default App;

export const TestButton = styled(Button, {
  borderRadius: '$4',
});
