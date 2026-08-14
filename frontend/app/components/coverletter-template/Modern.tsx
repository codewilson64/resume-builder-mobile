import { View, Text, Dimensions } from "react-native";
import { useCoverLetterStore } from "../../store/coverLetterStore";

const { width: screenWidth } = Dimensions.get("window");

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const scale = (screenWidth - 110) / A4_WIDTH;
const scaledWidth = A4_WIDTH * scale;
const scaledHeight = A4_HEIGHT * scale;

export default function Modern() {
  const { header, body, footer } = useCoverLetterStore();

  const fullName = `${header?.firstName ?? ""} ${header?.lastName ?? ""}`.trim();

  const contactItems = [
    header?.email,
    header?.phone,
  ].filter(Boolean);

  return (
    <View
      style={{
        width: scaledWidth,
        height: scaledHeight,
        backgroundColor: "#FFFFFF",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          backgroundColor: "#FFFFFF",
          transform: [
            { translateX: -(A4_WIDTH * (1 - scale)) / 2 },
            { translateY: -(A4_HEIGHT * (1 - scale)) / 2 },
            { scale },
          ],
        }}
      >
        {/* Header - name left, contact block right */}
        <View className="flex-row justify-between items-start px-10 pt-12">
          {/* Left: Name */}
          <View className="flex-1 pr-6">
            <Text className="text-2xl font-bold text-black">
              {fullName || "Your Name"}
            </Text>
          </View>

          {/* Right: Contact details as a vertical block */}
          <View className="items-end">
            {contactItems.length > 0 ? (
              contactItems.map((item, index) => (
                <Text
                  key={index}
                  className="text-sm text-black text-right"
                  style={{ marginTop: index === 0 ? 0 : 4 }}
                >
                  {item}
                </Text>
              ))
            ) : (
              <Text className="text-sm text-gray-400 text-right">
                email@example.com{"\n"}
                +1 234 567 890
              </Text>
            )}
          </View>
        </View>

        {/* Body */}
        <View className="px-10 mt-10">
          {body?.body ? (
            <Text className="text-sm leading-6 text-black">{body.body}</Text>
          ) : (
            <Text className="text-sm leading-6 text-gray-400">
              Start writing your cover letter here...
            </Text>
          )}
        </View>

        {/* Footer */}
        <View className="px-10 mt-10">
          {footer?.footer ? (
            <Text className="text-sm leading-6 text-black">{footer.footer}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}