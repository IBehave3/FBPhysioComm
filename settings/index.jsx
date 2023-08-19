registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title={
        <Text bold align="center">
          App Settings
        </Text>
      }
    >
      <Text align="center">FB Physio Comm</Text>
      <TextInput settingsKey="username" label="username" />
      <Toggle settingsKey="sendData" label="Send Data" />
    </Section>
  </Page>
));

