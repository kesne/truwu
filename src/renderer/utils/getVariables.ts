export const globalVariables = {} as Record<string, any>;

export default function getVariables(eventData: any): Record<string, any> {
  return {
    ...globalVariables,
    $rewardMessage: eventData?.redemption?.user_input,
    $username:
      eventData?.redemption?.user?.display_name ||
      eventData?.userstate?.["display-name"],
    $bits: Number(eventData?.userstate?.bits),
  };
}
