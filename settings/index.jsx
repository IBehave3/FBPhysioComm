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
      <TextInput settingsKey="dbContainerName" label="dbContainerName" placeholder="dbContainerName" />
      <TextInput settingsKey="dbName" label="dbName" placeholder="dbName" />
      <Toggle settingsKey="sendData" label="Send Data" />
    </Section>
  </Page>
));

