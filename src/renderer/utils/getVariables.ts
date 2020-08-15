export default function getVariables(eventData: any): Record<string, any> {
  return {
    $rewardMessage: eventData?.redemption?.user_input,
    $username:
      eventData?.redemption?.user?.display_name ||
      eventData?.userstate?.["display-name"],
    $bits: Number(eventData?.userstate?.bits),
  };
}
