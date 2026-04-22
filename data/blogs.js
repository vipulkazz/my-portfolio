export const blogPosts = [
  {
    slug: "app-variants-splash-screens-react-native",
    title:
      "Mobile Application App Variants with Different Splash Screens and App Icons — React Native",
    description:
      "Step-by-step guide to configuring multiple app variants in React Native with unique splash screens and app icons for Android productFlavors and iOS schemes.",
    date: "2024-03-15",
    category: "React Native",
    readTime: "5 min read",
    sections: [
      "What Are App Variants?",
      "Android Product Flavors",
      "iOS Schemes and Targets",
      "Splash Screen Per Variant",
      "App Icon Management",
      "Build Commands",
      "Debugging Tips",
    ],
    mediumLink:
      "https://medium.com/@vipulkaushik96/mobile-application-app-variants-with-different-splash-screens-and-app-icons-react-native-965ae6939e7d",
    content: `<p>If you've ever had to ship a white-label app, a staging build alongside a production build, or simply a "dev" flavour that points to a different API endpoint, you already know the pain of manually swapping icons and splash screens before every release. App variants solve this problem cleanly. In my experience building client apps for regulated industries, getting variants right early saves dozens of hours across a project's lifetime.</p>

<h2>What Are App Variants?</h2>
<p>An app variant is a distinct build of the same codebase that can have a different bundle ID, app name, icon, splash screen, and environment configuration. On Android these are called <strong>product flavors</strong>; on iOS they are managed through <strong>schemes</strong> and <strong>targets</strong>. A single React Native repo can produce a <code>dev</code>, <code>staging</code>, and <code>production</code> variant — all installable side-by-side on the same device.</p>

<h2>Android: Product Flavors in build.gradle</h2>
<p>Open <code>android/app/build.gradle</code> and add a <code>flavorDimensions</code> block inside <code>android {}</code>:</p>

<pre><code>android {
    flavorDimensions "env"

    productFlavors {
        dev {
            dimension "env"
            applicationIdSuffix ".dev"
            versionNameSuffix "-dev"
            resValue "string", "app_name", "MyApp Dev"
        }
        staging {
            dimension "env"
            applicationIdSuffix ".staging"
            versionNameSuffix "-staging"
            resValue "string", "app_name", "MyApp Staging"
        }
        production {
            dimension "env"
            resValue "string", "app_name", "MyApp"
        }
    }
}</code></pre>

<p>Each flavor gets its own source set at <code>android/app/src/&lt;flavorName&gt;/</code>. Assets placed there override the <code>main</code> source set, which is where variant-specific icons and splash screens live.</p>

<h2>Android Splash Screen Per Variant</h2>
<p>React Native 0.73+ uses the native <code>SplashScreen</code> API. Place a variant-specific <code>launch_screen.xml</code> inside <code>android/app/src/dev/res/drawable/</code>. The build system automatically picks the correct drawable for each flavor.</p>

<pre><code>android/app/src/
├── dev/
│   └── res/
│       ├── drawable/
│       │   └── launch_screen.xml   ← dev splash (orange brand)
│       └── mipmap-*/
│           └── ic_launcher.png     ← dev icon
├── staging/
│   └── res/
│       ├── drawable/
│       │   └── launch_screen.xml   ← staging splash (yellow brand)
│       └── mipmap-*/
│           └── ic_launcher.png     ← staging icon
└── main/
    └── res/
        ├── drawable/
        │   └── launch_screen.xml   ← production splash
        └── mipmap-*/
            └── ic_launcher.png     ← production icon</code></pre>

<h2>App Icon Management on Android</h2>
<p>Generate icons at all required densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) using Android Asset Studio or the Figma Android Icon exporter. Drop the resulting <code>mipmap-*</code> folders into the matching flavor source set. The production icon stays in <code>main/res/</code> and serves as the fallback.</p>

<h2>iOS: Schemes and Targets</h2>
<p>In Xcode, duplicate your existing target for each environment. Name them <code>MyApp-Dev</code>, <code>MyApp-Staging</code>, and <code>MyApp</code> (production). For each duplicated target:</p>
<ul>
  <li>Set a unique <strong>Bundle Identifier</strong> (e.g., <code>com.mycompany.myapp.dev</code>).</li>
  <li>Create a matching <strong>scheme</strong> so you can build from the command line.</li>
  <li>Assign a separate <strong>Asset Catalog</strong> or use a single catalog with multiple AppIcon sets, one per target.</li>
</ul>

<pre><code># Build the dev scheme from the CLI
xcodebuild -workspace ios/MyApp.xcworkspace \
  -scheme MyApp-Dev \
  -configuration Debug \
  -sdk iphonesimulator</code></pre>

<h2>iOS Splash Screen Per Variant</h2>
<p>React Native uses <code>LaunchScreen.storyboard</code> by default. Create a copy — <code>LaunchScreen-Dev.storyboard</code> — and reference it in your <code>MyApp-Dev</code> target's <strong>Info.plist</strong> under the <code>UILaunchStoryboardName</code> key. This lets each target render a completely different splash layout and color without touching shared code.</p>

<h2>Reading the Active Flavor in JavaScript</h2>
<p>Use <code>react-native-config</code> to expose environment variables to JS based on the active variant:</p>

<pre><code>// .env.dev
API_URL=https://api-dev.myapp.com
APP_ENV=development

// .env.production
API_URL=https://api.myapp.com
APP_ENV=production</code></pre>

<pre><code>import Config from 'react-native-config';

console.log(Config.API_URL);  // "https://api-dev.myapp.com" in dev build
console.log(Config.APP_ENV);  // "development"</code></pre>

<h2>Build Commands</h2>
<pre><code># Android — run the dev flavor on a connected device
npx react-native run-android --variant=devDebug

# Android — assemble a release APK for staging
cd android && ./gradlew assembleStagingRelease

# iOS — run the Dev scheme in the simulator
npx react-native run-ios --scheme MyApp-Dev</code></pre>

<h2>Debugging Tips</h2>
<ul>
  <li><strong>Icons not updating?</strong> Run <code>./gradlew clean</code> on Android or delete the DerivedData folder on iOS.</li>
  <li><strong>Wrong splash on iOS?</strong> Confirm <code>UILaunchStoryboardName</code> is set per-target, not just in the shared Info.plist.</li>
  <li><strong>Bundle ID collision?</strong> Each flavor must produce a unique applicationId, otherwise the OS treats them as the same app and the install will overwrite the other variant.</li>
</ul>

<p>Setting up variants properly takes about half a day up front, but the payoff — clean, one-command builds for every environment — is worth every minute. If you're managing multiple white-label clients from one codebase, this pattern is non-negotiable.</p>`,
  },

  {
    slug: "speech-to-text-react-native-whisper",
    title: "Build a Speech-to-Text React Native App with Whisper RN",
    description:
      "Learn to integrate OpenAI's Whisper model locally in a React Native app using whisper.rn — covering installation, audio recording, transcription, UI, and performance tuning.",
    date: "2024-06-20",
    category: "React Native",
    readTime: "8 min read",
    sections: [
      "Why Whisper RN?",
      "Installation & Setup",
      "Downloading the Model",
      "Recording Audio",
      "Running Transcription",
      "Building the UI",
      "Performance Tips",
      "Error Handling",
    ],
    mediumLink:
      "https://medium.com/@vipulkaushik96/build-a-speech-to-text-react-native-app-with-whisper-rn-364439770728",
    content: `<p>On-device speech recognition has been a hard problem for mobile developers for years. Cloud APIs add latency, cost, and privacy concerns — especially in healthcare and enterprise apps where audio may contain sensitive information. <strong>whisper.rn</strong> brings OpenAI's Whisper model directly onto the device, giving you fast, accurate, offline transcription without sending a single byte to an external server. I've used this in a telehealth project and the accuracy at the <code>base.en</code> model level genuinely surprised me.</p>

<h2>Why Whisper RN Over Cloud APIs?</h2>
<ul>
  <li><strong>Privacy:</strong> Audio never leaves the device — essential for HIPAA-adjacent use cases.</li>
  <li><strong>Offline:</strong> Works without a network connection.</li>
  <li><strong>Cost:</strong> No per-minute billing.</li>
  <li><strong>Latency:</strong> On a modern iPhone or Android flagship, a 30-second clip transcribes in 3–6 seconds.</li>
</ul>
<p>The trade-off is model size (the <code>base</code> model is ~140 MB) and slightly lower accuracy than Whisper Large running server-side. For most voice memo or note-taking use cases, <code>base.en</code> hits the sweet spot.</p>

<h2>Installation</h2>
<pre><code>npm install whisper.rn
# or
yarn add whisper.rn</code></pre>

<p>For iOS, run <code>pod install</code> inside the <code>ios/</code> directory. On Android, the library ships pre-compiled native binaries, so no extra NDK configuration is needed as of whisper.rn 0.3+.</p>

<p>Also install <code>react-native-audio-record</code> for microphone capture:</p>
<pre><code>npm install react-native-audio-record</code></pre>

<p>Add microphone permissions. In <code>android/app/src/main/AndroidManifest.xml</code>:</p>
<pre><code>&lt;uses-permission android:name="android.permission.RECORD_AUDIO" /&gt;
&lt;uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" /&gt;</code></pre>

<p>In <code>ios/MyApp/Info.plist</code>:</p>
<pre><code>&lt;key&gt;NSMicrophoneUsageDescription&lt;/key&gt;
&lt;string&gt;We need microphone access to transcribe your speech.&lt;/string&gt;</code></pre>

<h2>Downloading the Whisper Model</h2>
<p>whisper.rn accepts a local file path to the <code>.bin</code> model file. The cleanest approach is to download it on first launch and cache it in the app's document directory:</p>

<pre><code>import RNFS from 'react-native-fs';

const MODEL_URL =
  'https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin';
const MODEL_PATH = \`\${RNFS.DocumentDirectoryPath}/ggml-base.en.bin\`;

export async function ensureModelDownloaded(onProgress) {
  const exists = await RNFS.exists(MODEL_PATH);
  if (exists) return MODEL_PATH;

  await RNFS.downloadFile({
    fromUrl: MODEL_URL,
    toFile: MODEL_PATH,
    progress: (res) => {
      const pct = Math.round((res.bytesWritten / res.contentLength) * 100);
      onProgress?.(pct);
    },
  }).promise;

  return MODEL_PATH;
}</code></pre>

<h2>Recording Audio</h2>
<p>Configure <code>react-native-audio-record</code> to output a 16 kHz mono WAV file — the exact format Whisper expects:</p>

<pre><code>import AudioRecord from 'react-native-audio-record';

const AUDIO_OPTIONS = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  wavFile: 'recording.wav',
};

export function startRecording() {
  AudioRecord.init(AUDIO_OPTIONS);
  AudioRecord.start();
}

export async function stopRecording() {
  const filePath = await AudioRecord.stop();
  return filePath; // absolute path to the .wav file
}</code></pre>

<h2>Running Transcription</h2>
<pre><code>import { initWhisper } from 'whisper.rn';

let whisperContext = null;

export async function loadWhisper(modelPath) {
  whisperContext = await initWhisper({ filePath: modelPath });
}

export async function transcribeFile(audioPath) {
  if (!whisperContext) throw new Error('Whisper not initialised');

  const { result } = await whisperContext.transcribe(audioPath, {
    language: 'en',
    maxLen: 1,
    tokenTimestamps: true,
  });

  return result; // plain-text transcription string
}</code></pre>

<h2>Building the UI</h2>
<pre><code>import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity,
  ActivityIndicator, StyleSheet,
} from 'react-native';
import { startRecording, stopRecording } from './audio';
import { transcribeFile, loadWhisper } from './whisper';
import { ensureModelDownloaded } from './model';

export default function TranscriberScreen() {
  const [status, setStatus] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const modelPath = useRef(null);

  async function handlePress() {
    if (status === 'idle') {
      if (!modelPath.current) {
        setStatus('downloading');
        modelPath.current = await ensureModelDownloaded(setDownloadProgress);
        await loadWhisper(modelPath.current);
      }
      setStatus('recording');
      startRecording();
    } else if (status === 'recording') {
      const audioPath = await stopRecording();
      setStatus('transcribing');
      const text = await transcribeFile(audioPath);
      setTranscript(text);
      setStatus('idle');
    }
  }

  const buttonLabel = {
    idle: 'Start Recording',
    downloading: \`Downloading model \${downloadProgress}%\`,
    recording: 'Stop & Transcribe',
    transcribing: 'Transcribing…',
  }[status];

  return (
    &lt;View style={styles.container}&gt;
      {status === 'transcribing' ? (
        &lt;ActivityIndicator size="large" /&gt;
      ) : (
        &lt;TouchableOpacity
          style={[styles.btn, status === 'recording' &amp;&amp; styles.btnRecording]}
          onPress={handlePress}
          disabled={status === 'downloading' || status === 'transcribing'}
        &gt;
          &lt;Text style={styles.btnText}&gt;{buttonLabel}&lt;/Text&gt;
        &lt;/TouchableOpacity&gt;
      )}
      {transcript ? &lt;Text style={styles.transcript}&gt;{transcript}&lt;/Text&gt; : null}
    &lt;/View&gt;
  );
}</code></pre>

<h2>Performance Tips</h2>
<ul>
  <li><strong>Initialise once:</strong> Call <code>initWhisper</code> at app startup (or after download), not before every transcription. Loading the model takes ~1–2 seconds.</li>
  <li><strong>Use <code>base.en</code> for English-only apps:</strong> It is 3x faster than <code>small</code> with minimal accuracy drop on clear speech.</li>
  <li><strong>Run on a background thread:</strong> whisper.rn handles this internally, but avoid blocking the JS thread with synchronous preprocessing.</li>
  <li><strong>Trim silence:</strong> Strip leading and trailing silence from the WAV before passing it to Whisper. A 5-second clip with 4 seconds of silence still takes as long as a genuine 5-second clip.</li>
</ul>

<h2>Error Handling</h2>
<pre><code>try {
  const text = await transcribeFile(audioPath);
  setTranscript(text);
} catch (err) {
  if (err.message.includes('model')) {
    // Model file corrupted — delete and re-download
    await RNFS.unlink(MODEL_PATH);
    modelPath.current = null;
    Alert.alert('Model error', 'Please restart and try again.');
  } else {
    Alert.alert('Transcription failed', err.message);
  }
}</code></pre>

<p>whisper.rn is one of those libraries that genuinely changes what's possible in a mobile app. Once you have on-device transcription running, features like searchable voice notes, real-time captions, and hands-free data entry become straightforward to build — all without a cloud dependency.</p>`,
  },

  {
    slug: "react-native-expo-vs-bare-workflow",
    title: "Expo vs Bare Workflow in React Native: Which Should You Choose in 2024?",
    description:
      "A practical comparison of Expo managed and bare workflows — native modules, EAS Build, Config Plugins, migration paths, and real-world trade-offs for your next project.",
    date: "2024-08-10",
    category: "React Native",
    readTime: "6 min read",
    sections: [
      "Managed vs Bare at a Glance",
      "When to Use Managed Workflow",
      "When to Go Bare",
      "EAS Build Changes Everything",
      "Config Plugins",
      "Migrating from Managed to Bare",
      "My Recommendation",
    ],
    mediumLink: null,
    content: `<p>The Expo vs bare workflow debate has been a constant in React Native teams since Expo launched. In 2024 the landscape looks meaningfully different from three years ago — EAS Build, Expo Modules API, and Config Plugins have blurred the line considerably. If you're starting a new project or evaluating a migration, here's how I think about the decision after shipping apps in both setups.</p>

<h2>Managed vs Bare at a Glance</h2>
<p>In the <strong>managed workflow</strong>, Expo owns the native layer. You write JavaScript and Expo's SDK handles camera, notifications, file system, and everything else. You never open Xcode or Android Studio unless something goes wrong. In the <strong>bare workflow</strong>, you have the full native project — <code>ios/</code> and <code>android/</code> directories checked into git — and you're responsible for native dependencies, signing, and build configuration.</p>

<p>A middle path exists: the <strong>bare workflow with Expo modules</strong>. You keep the native directories but use Expo's curated SDK and Config Plugins to manage most native configuration automatically. This is what most production teams end up on.</p>

<h2>When to Use Managed Workflow</h2>
<ul>
  <li>You're prototyping or building an MVP and want to move fast.</li>
  <li>Your feature set is covered by the Expo SDK (camera, maps, push notifications, local storage, sensors).</li>
  <li>Your team has limited native iOS/Android experience.</li>
  <li>You want to use Expo Go for instant team previews without a build step.</li>
</ul>
<p>Managed workflow is genuinely excellent for these scenarios. I've shipped two internal tools using it and the developer experience — especially with Expo Router for file-based navigation — is hard to beat.</p>

<h2>When to Go Bare</h2>
<ul>
  <li>You need a native module with no Expo SDK equivalent and no Config Plugin.</li>
  <li>You're integrating a proprietary SDK delivered as a binary (e.g., a payment terminal, Bluetooth device, or enterprise SSO library).</li>
  <li>You need fine-grained control over <code>build.gradle</code> or the <code>Podfile</code> — app variants, custom build phases, CocoaPods subspecs.</li>
  <li>Your app has strict binary size requirements — the Expo managed runtime adds overhead.</li>
</ul>

<h2>EAS Build Changes the Equation</h2>
<p>Historically, the managed workflow's biggest limitation was that you couldn't build a standalone binary locally without ejecting. EAS Build removed that constraint. You can now build a managed app as a production IPA or APK in CI without any Mac runners — Expo's cloud infrastructure handles it.</p>

<pre><code># Install EAS CLI
npm install -g eas-cli

# Configure your project
eas build:configure

# Build for both platforms
eas build --platform all --profile production</code></pre>

<p>EAS Build supports both managed and bare workflows, so switching between them is less disruptive than it used to be.</p>

<h2>Config Plugins: Native Power Without Ejecting</h2>
<p>Config Plugins let you modify native files declaratively from <code>app.config.js</code>. Many popular libraries now ship their own plugin:</p>

<pre><code>// app.config.js
export default {
  expo: {
    plugins: [
      ["expo-camera", {
        "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera."
      }],
      ["@react-native-firebase/app", {
        "googleServicesFile": "./google-services.json"
      }],
      ["expo-build-properties", {
        "android": { "compileSdkVersion": 34 },
        "ios": { "deploymentTarget": "15.0" }
      }]
    ]
  }
};</code></pre>

<p>A Config Plugin runs at build time and patches the native project automatically. If a plugin exists for your dependency, you get native integration without ever opening Xcode.</p>

<h2>Migrating from Managed to Bare</h2>
<p>If you hit a wall in managed workflow, migration is straightforward:</p>
<pre><code>npx expo prebuild</code></pre>
<p>This generates the <code>ios/</code> and <code>android/</code> directories from your current config. From this point you're in the bare workflow. The generated files become yours to own — commit them and treat them like any other native project. You keep all Expo SDK packages and EAS services.</p>

<h2>My Recommendation</h2>
<p>Start with managed workflow and <code>expo prebuild</code> only when you genuinely need it. In 2024, Config Plugins cover the vast majority of native integration needs without ejecting. If you're building a healthcare app, an enterprise tool with a proprietary SDK, or an app with multiple build variants, start bare from day one — the complexity is lower when you design for it upfront rather than migrating mid-project.</p>`,
    faq: [
      {
        question: "What is the difference between Expo managed and bare workflow?",
        answer: "In the managed workflow, Expo owns the native layer and you write only JavaScript. In the bare workflow, you have full access to the ios/ and android/ directories and manage native dependencies yourself. A middle path — bare workflow with Expo modules — lets you keep native directories while using Expo's SDK and Config Plugins."
      },
      {
        question: "When should I use Expo managed workflow for React Native?",
        answer: "Use managed workflow when you are prototyping or building an MVP, your feature set is covered by the Expo SDK, your team has limited native experience, or you want instant team previews via Expo Go without a build step."
      },
      {
        question: "Can I migrate from Expo managed to bare workflow?",
        answer: "Yes. Running npx expo prebuild generates the ios/ and android/ directories from your current config. From that point you are in the bare workflow and can commit the generated files. You keep all Expo SDK packages and EAS services after migration."
      },
    ],
  },

  {
    slug: "react-native-performance-optimization",
    title: "10 React Native Performance Tips That Actually Work",
    description:
      "Proven techniques to eliminate jank in React Native apps — FlatList tuning, Hermes, memo patterns, native driver animations, image caching, and startup time reduction.",
    date: "2024-10-05",
    category: "Performance",
    readTime: "7 min read",
    sections: [
      "1. Enable Hermes",
      "2. Optimise FlatList",
      "3. Use React.memo Correctly",
      "4. Native Driver for Animations",
      "5. Image Caching",
      "6. Reduce Bridge Traffic",
      "7. Lazy Load Screens",
      "8. Bundle Size Reduction",
      "9. Optimise App Startup",
      "10. Profile Before You Optimise",
    ],
    mediumLink: null,
    content: `<p>Performance problems in React Native usually fall into one of three buckets: too many re-renders on the JS thread, too much data crossing the bridge, or expensive work happening synchronously at the wrong time. After eight years and dozens of shipped apps, these are the ten techniques I reach for first — in order of impact.</p>

<h2>1. Enable Hermes</h2>
<p>Hermes is a JavaScript engine built specifically for React Native. It pre-compiles JS to bytecode at build time, reducing startup time and memory usage significantly. As of React Native 0.70, Hermes is enabled by default. If you're on an older project, turn it on:</p>
<pre><code>// android/app/build.gradle
project.ext.react = [
    enableHermes: true,
]</code></pre>
<pre><code>// ios/Podfile
use_react_native!(
  :path => config[:reactNativePath],
  :hermes_enabled => true
)</code></pre>
<p>In my testing, Hermes cuts cold-start time by 20–40% on mid-range Android devices — the category where performance complaints are most common.</p>

<h2>2. Optimise FlatList Rendering</h2>
<p>FlatList is the most common source of jank in React Native apps. The key props to tune:</p>
<pre><code>&lt;FlatList
  data={items}
  keyExtractor={(item) =&gt; item.id}
  renderItem={renderItem}
  initialNumToRender={10}
  maxToRenderPerBatch={5}
  windowSize={5}
  removeClippedSubviews={true}
  getItemLayout={(_, index) =&gt; ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/&gt;</code></pre>
<p>If all your list items are the same height, <code>getItemLayout</code> is the single biggest win — it eliminates expensive layout measurement on every scroll event.</p>

<h2>3. Use React.memo, useMemo, and useCallback Correctly</h2>
<p>Wrapping every component in <code>React.memo</code> is a common mistake. Memo only helps if the component's props actually remain referentially stable. Pair it with <code>useCallback</code> for function props:</p>
<pre><code>const renderItem = useCallback(({ item }) =&gt; (
  &lt;PostCard post={item} onPress={handlePress} /&gt;
), [handlePress]);

const PostCard = React.memo(({ post, onPress }) =&gt; (
  &lt;TouchableOpacity onPress={() =&gt; onPress(post.id)}&gt;
    &lt;Text&gt;{post.title}&lt;/Text&gt;
  &lt;/TouchableOpacity&gt;
));</code></pre>
<p>Without <code>useCallback</code>, <code>renderItem</code> is a new function reference on every parent render, which defeats <code>React.memo</code> entirely.</p>

<h2>4. Always Use the Native Driver for Animations</h2>
<p>The JS thread runs at 60 fps — until it doesn't. Any animation driven by the JS thread will stutter when the JS thread is busy. Move animations to the native thread:</p>
<pre><code>Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,  // runs on UI thread, immune to JS jank
}).start();</code></pre>
<p>Note: native driver only supports <code>transform</code> and <code>opacity</code> properties. For layout animations, use <code>react-native-reanimated</code>, which runs entirely on the UI thread via its own worklet runtime.</p>

<h2>5. Cache Images Aggressively</h2>
<p>The default <code>&lt;Image&gt;</code> component has no persistent cache. On Android especially, images re-download on every cold start. Use <code>react-native-fast-image</code>:</p>
<pre><code>import FastImage from 'react-native-fast-image';

&lt;FastImage
  source={{
    uri: 'https://cdn.example.com/photo.jpg',
    priority: FastImage.priority.high,
    cache: FastImage.cacheControl.immutable,
  }}
  style={{ width: 200, height: 200 }}
/&gt;</code></pre>
<p>FastImage uses SDWebImage on iOS and Glide on Android — both have aggressive disk and memory caches tuned for mobile.</p>

<h2>6. Minimise Bridge Traffic</h2>
<p>Every call between JS and native has overhead. Batch your native calls, avoid polling native modules on timers, and prefer event-driven patterns. With the New Architecture (Fabric + TurboModules), synchronous JSI calls are available — but the principle still holds: fewer round trips is always faster.</p>

<h2>7. Lazy Load Screens with React Navigation</h2>
<pre><code>const Stack = createNativeStackNavigator();

// Screen module is loaded only when first navigated to
&lt;Stack.Screen
  name="Profile"
  getComponent={() =&gt; require('./screens/Profile').default}
/&gt;</code></pre>
<p>This defers parsing and executing screen modules until the user actually navigates there, reducing startup bundle evaluation time.</p>

<h2>8. Reduce Bundle Size</h2>
<ul>
  <li>Run <code>npx react-native-bundle-visualizer</code> to identify large dependencies.</li>
  <li>Replace <code>moment.js</code> (329 KB) with <code>date-fns</code> (~15 KB for common functions).</li>
  <li>Use <code>metro.config.js</code> to alias <code>lodash</code> to <code>lodash-es</code> and enable tree-shaking.</li>
  <li>Enable Hermes bytecode compression (covered above).</li>
</ul>

<h2>9. Optimise App Startup Time</h2>
<p>Cold startup time is the first impression your app makes. Defer all non-critical initialisation:</p>
<pre><code>useEffect(() =&gt; {
  // Critical path only
  initCrashReporting();

  InteractionManager.runAfterInteractions(() =&gt; {
    // Runs after the first frame is painted
    initAnalytics();
    prefetchUserData();
  });
}, []);</code></pre>

<h2>10. Profile Before You Optimise</h2>
<p>Open <strong>Flipper</strong> and use the React DevTools plugin to record a render trace before touching a single line of code. You'll often find that the bottleneck is a single component re-rendering 50 times per second — and the fix is a one-line <code>useMemo</code>, not a week of refactoring. Measure first, optimise second.</p>

<blockquote>Premature optimisation is the root of all evil — but uninformed optimisation runs a close second. Know what's slow before you fix it.</blockquote>`,
    faq: [
      {
        question: "How do I improve React Native app performance?",
        answer: "Start by enabling Hermes for faster startup, optimise FlatList with getItemLayout and windowSize, use React.memo to prevent unnecessary re-renders, and enable the native driver for animations. Always profile with Flipper before optimising to find the actual bottleneck."
      },
      {
        question: "What is Hermes and why should I enable it in React Native?",
        answer: "Hermes is a JavaScript engine built specifically for React Native that pre-compiles JS to bytecode at build time. It significantly reduces startup time and memory usage. As of React Native 0.70, Hermes is enabled by default in new projects."
      },
      {
        question: "How do I optimise FlatList performance in React Native?",
        answer: "Use getItemLayout to skip measurement, set windowSize to limit off-screen rendering, add keyExtractor, use React.memo on row components, and avoid inline functions in renderItem. These changes alone can eliminate most list-related jank."
      },
    ],
  },

  {
    slug: "react-native-push-notifications-guide",
    title: "Complete Guide to Push Notifications in React Native (FCM + APNs)",
    description:
      "End-to-end setup for push notifications in React Native — FCM and APNs configuration, permission handling, foreground/background/quit states, channels, and deep linking.",
    date: "2024-11-18",
    category: "React Native",
    readTime: "8 min read",
    sections: [
      "FCM vs APNs Overview",
      "Setting Up Firebase",
      "Requesting Permissions",
      "Handling Three Notification States",
      "Android Notification Channels",
      "Deep Linking from Notifications",
      "Testing Push Notifications",
    ],
    mediumLink: null,
    content: `<p>Push notifications are one of the most requested features in mobile apps and one of the most error-prone to implement. Between Android's notification channels, iOS entitlements, background state handling, and the APNs/FCM split, there are a lot of moving parts. This guide covers the full setup from Firebase project creation to production-ready notification handling.</p>

<h2>FCM vs APNs — What's the Difference?</h2>
<p><strong>APNs</strong> (Apple Push Notification service) is Apple's delivery infrastructure. <strong>FCM</strong> (Firebase Cloud Messaging) is Google's. On Android, FCM delivers directly. On iOS, FCM acts as a relay — your server sends to FCM, which forwards to APNs, which delivers to the device. Most React Native projects use FCM as a single endpoint for both platforms.</p>

<h2>Setting Up Firebase</h2>
<ol>
  <li>Create a project at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer">console.firebase.google.com</a>.</li>
  <li>Download <code>google-services.json</code> (Android) and <code>GoogleService-Info.plist</code> (iOS).</li>
  <li>Place them at <code>android/app/google-services.json</code> and <code>ios/MyApp/GoogleService-Info.plist</code>.</li>
</ol>

<pre><code>npm install @react-native-firebase/app @react-native-firebase/messaging</code></pre>

<p>In <code>android/build.gradle</code>, add the Google services classpath:</p>
<pre><code>buildscript {
  dependencies {
    classpath 'com.google.gms:google-services:4.4.0'
  }
}</code></pre>

<p>In <code>android/app/build.gradle</code>, apply the plugin at the bottom:</p>
<pre><code>apply plugin: 'com.google.gms.google-services'</code></pre>

<p>On iOS, add the Push Notifications capability in Xcode under <strong>Signing &amp; Capabilities</strong>, then upload your APNs key or certificate to the Firebase console under Project Settings &gt; Cloud Messaging.</p>

<h2>Requesting Permissions</h2>
<pre><code>import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';

export async function requestNotificationPermission() {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      Alert.alert(
        'Notifications disabled',
        'Enable notifications in Settings to receive updates.',
      );
      return false;
    }
  }

  // Android 13+ requires runtime permission
  if (Platform.OS === 'android' &amp;&amp; Platform.Version &gt;= 33) {
    const { PermissionsAndroid } = require('react-native');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return false;
  }

  return true;
}</code></pre>

<h2>Getting and Storing the FCM Token</h2>
<pre><code>export async function registerDevice() {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  // Send token to your backend for storage
  await api.updateDeviceToken(token);

  // Refresh token when it changes
  return messaging().onTokenRefresh(async (newToken) =&gt; {
    await api.updateDeviceToken(newToken);
  });
}</code></pre>

<h2>Handling the Three Notification States</h2>
<p>A notification can arrive when the app is in one of three states. Each requires different handling:</p>

<pre><code>import messaging from '@react-native-firebase/messaging';

// 1. FOREGROUND — app is open and active
messaging().onMessage(async (remoteMessage) =&gt; {
  // FCM does NOT show a system notification in foreground automatically
  // Display your own in-app banner or use notifee for a local notification
  showInAppBanner(remoteMessage.notification);
});

// 2. BACKGROUND — notification tapped while app was in background
messaging().onNotificationOpenedApp((remoteMessage) =&gt; {
  navigateFromNotification(remoteMessage.data);
});

// 3. QUIT STATE — app was fully closed
messaging()
  .getInitialNotification()
  .then((remoteMessage) =&gt; {
    if (remoteMessage) navigateFromNotification(remoteMessage.data);
  });

// Background handler for data-only messages (must be outside component tree)
messaging().setBackgroundMessageHandler(async (remoteMessage) =&gt; {
  console.log('Background message:', remoteMessage);
});</code></pre>

<h2>Android Notification Channels</h2>
<p>Android 8+ requires all notifications to be assigned to a channel. Users can silence individual channels in system settings. Use <code>notifee</code> to manage channels:</p>

<pre><code>import notifee, { AndroidImportance } from '@notifee/react-native';

export async function createNotificationChannels() {
  await notifee.createChannel({
    id: 'alerts',
    name: 'Critical Alerts',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });

  await notifee.createChannel({
    id: 'marketing',
    name: 'Promotions',
    importance: AndroidImportance.LOW,
  });
}</code></pre>

<h2>Deep Linking from Notifications</h2>
<p>Include a <code>screen</code> and <code>params</code> in the FCM data payload from your server:</p>
<pre><code>{
  "data": {
    "screen": "OrderDetail",
    "orderId": "ORD-12345"
  }
}</code></pre>

<pre><code>function navigateFromNotification(data) {
  if (!data?.screen) return;
  // navigationRef is a ref attached to NavigationContainer
  navigationRef.current?.navigate(data.screen, { id: data.orderId });
}</code></pre>

<h2>Testing Push Notifications</h2>
<ul>
  <li><strong>Firebase Console:</strong> Cloud Messaging &gt; Send test message &gt; paste your FCM token.</li>
  <li><strong>Android CLI:</strong> <code>adb shell am broadcast -a com.google.android.c2dm.intent.RECEIVE ...</code></li>
  <li><strong>iOS Simulator:</strong> <code>xcrun simctl push &lt;device-id&gt; &lt;bundle-id&gt; payload.apns</code></li>
</ul>

<p>Push notifications are one of those features where edge cases live in production. Test all three states — foreground, background, and quit — before every release. A notification that deep-links to a crashed screen is worse than no notification at all.</p>`,
  },

  {
    slug: "react-native-ci-cd-github-actions",
    title: "Automate React Native Builds with GitHub Actions and Fastlane",
    description:
      "Build a complete CI/CD pipeline for React Native using GitHub Actions and Fastlane — code signing, TestFlight uploads, Google Play internal track, and environment secrets management.",
    date: "2025-01-12",
    category: "DevOps",
    readTime: "7 min read",
    sections: [
      "Why CI/CD Matters for Mobile",
      "Project Structure",
      "Setting Up Fastlane",
      "iOS Fastlane Lane with Match",
      "Android Fastlane Lane",
      "GitHub Actions — iOS Workflow",
      "GitHub Actions — Android Workflow",
      "Managing Secrets",
      "Triggering Deployments",
    ],
    mediumLink: null,
    content: `<p>Manual app releases are a tax on your team's time and a source of human error. Forgetting to bump a version number, uploading the wrong build to TestFlight, or shipping a debug build to production — I've seen all of these happen on teams without automation. A well-configured CI/CD pipeline eliminates the entire category. Here's the setup I use across multiple React Native projects.</p>

<h2>Why CI/CD Matters for Mobile</h2>
<p>Mobile CI/CD solves three distinct problems: <strong>consistency</strong> (every build is produced the same way), <strong>speed</strong> (builds run in parallel without tying up a developer's machine), and <strong>auditability</strong> (every production build traces back to a specific commit and pull request).</p>

<h2>Project Structure</h2>
<pre><code>my-app/
├── .github/
│   └── workflows/
│       ├── ios-deploy.yml
│       └── android-deploy.yml
├── fastlane/
│   ├── Fastfile
│   ├── Appfile
│   └── Matchfile
├── ios/
└── android/</code></pre>

<h2>Setting Up Fastlane</h2>
<pre><code>gem install fastlane
cd ios &amp;&amp; fastlane init
cd ../android &amp;&amp; fastlane init</code></pre>

<p>Configure <code>fastlane/Appfile</code>:</p>
<pre><code># fastlane/Appfile
app_identifier("com.mycompany.myapp")
apple_id("dev@mycompany.com")
team_id("XXXXXXXXXX")</code></pre>

<h2>iOS Fastlane Lane with Match</h2>
<p>Use <code>match</code> to manage certificates and provisioning profiles in a private Git repo. This solves the certificate chaos that plagues iOS teams:</p>
<pre><code># fastlane/Matchfile
git_url("https://github.com/myorg/certificates")
storage_mode("git")
type("appstore")
app_identifier(["com.mycompany.myapp"])</code></pre>

<pre><code># fastlane/Fastfile
platform :ios do
  desc "Build and upload to TestFlight"
  lane :beta do
    increment_build_number(xcodeproj: "ios/MyApp.xcodeproj")
    match(type: "appstore", readonly: is_ci)
    build_app(
      workspace: "ios/MyApp.xcworkspace",
      scheme: "MyApp",
      configuration: "Release",
      export_method: "app-store",
      output_directory: "./build",
      output_name: "MyApp.ipa",
    )
    upload_to_testflight(
      skip_waiting_for_build_processing: true,
      changelog: last_git_commit[:message],
    )
  end
end</code></pre>

<h2>Android Fastlane Lane</h2>
<pre><code>platform :android do
  desc "Build and upload to Google Play internal track"
  lane :beta do
    gradle(
      task: "bundle",
      build_type: "Release",
      project_dir: "android/",
      properties: {
        "android.injected.signing.store.file" =&gt; ENV["KEYSTORE_PATH"],
        "android.injected.signing.store.password" =&gt; ENV["KEYSTORE_PASSWORD"],
        "android.injected.signing.key.alias" =&gt; ENV["KEY_ALIAS"],
        "android.injected.signing.key.password" =&gt; ENV["KEY_PASSWORD"],
      }
    )
    upload_to_play_store(
      track: "internal",
      aab: lane_context[SharedValues::GRADLE_AAB_OUTPUT_PATH],
    )
  end
end</code></pre>

<h2>GitHub Actions — iOS Workflow</h2>
<pre><code># .github/workflows/ios-deploy.yml
name: iOS Deploy to TestFlight

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true

      - name: Install CocoaPods
        run: cd ios &amp;&amp; pod install

      - name: Run Fastlane
        env:
          MATCH_PASSWORD: \${{ secrets.MATCH_PASSWORD }}
          MATCH_GIT_BASIC_AUTHORIZATION: \${{ secrets.MATCH_GIT_BASIC_AUTHORIZATION }}
          APP_STORE_CONNECT_API_KEY_ID: \${{ secrets.ASC_KEY_ID }}
          APP_STORE_CONNECT_API_ISSUER_ID: \${{ secrets.ASC_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_CONTENT: \${{ secrets.ASC_PRIVATE_KEY }}
        run: bundle exec fastlane ios beta</code></pre>

<h2>GitHub Actions — Android Workflow</h2>
<pre><code># .github/workflows/android-deploy.yml
name: Android Deploy to Play Store

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true

      - name: Decode keystore
        run: |
          echo "\${{ secrets.KEYSTORE_BASE64 }}" | base64 --decode &gt; android/app/release.keystore

      - name: Run Fastlane
        env:
          KEYSTORE_PATH: android/app/release.keystore
          KEYSTORE_PASSWORD: \${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: \${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: \${{ secrets.KEY_PASSWORD }}
          SUPPLY_JSON_KEY_DATA: \${{ secrets.PLAY_STORE_JSON_KEY }}
        run: bundle exec fastlane android beta</code></pre>

<h2>Managing Secrets</h2>
<p>Store all sensitive values in GitHub repository secrets (Settings &gt; Secrets and variables &gt; Actions). Never commit keystores, certificates, or API keys to your repository. For the Android keystore, Base64-encode it and store that string as a secret:</p>
<pre><code># Encode your keystore locally
base64 -i android/app/release.keystore | pbcopy
# Paste into GitHub secret: KEYSTORE_BASE64</code></pre>

<h2>Triggering Deployments</h2>
<p>The workflow above runs on every push to <code>main</code>. For a more controlled flow, add a version tag trigger:</p>
<pre><code>on:
  push:
    tags:
      - 'v*.*.*'   # triggers on v1.2.3, v2.0.0, etc.</code></pre>

<p>A tag-based trigger means your team controls exactly when a release is sent to TestFlight or the Play Store — no accidental deploys from routine merges to main.</p>`,
  },

  {
    slug: "react-native-state-management-2024",
    title: "Redux vs Zustand vs Jotai: React Native State Management in 2024",
    description:
      "A practical comparison of Redux Toolkit, Zustand, and Jotai for React Native apps — with real code examples, bundle sizes, persistence strategies, and guidance on when to choose each.",
    date: "2025-02-20",
    category: "React Native",
    readTime: "6 min read",
    sections: [
      "The State Management Landscape",
      "Redux Toolkit",
      "Zustand",
      "Jotai",
      "Bundle Size Comparison",
      "Persistence Strategies",
      "When to Use Which",
      "My Take",
    ],
    mediumLink: null,
    content: `<p>State management is one of the most debated topics in React Native. The answer has shifted considerably in the last two years: Context API scaled further than people expected, Redux lost ground to lighter alternatives, and Zustand and Jotai emerged as genuine production options. Here's how I evaluate each for mobile projects today, with real code to back it up.</p>

<h2>The Landscape in 2025</h2>
<p>Three tools dominate new project decisions: <strong>Redux Toolkit</strong> (the modern Redux experience), <strong>Zustand</strong> (lightweight, store-based), and <strong>Jotai</strong> (atomic, bottom-up). All three are actively maintained and work in React Native without modification. The choice is rarely about capability — it's about team mental model and app complexity.</p>

<h2>Redux Toolkit</h2>
<p>Redux Toolkit (RTK) is Redux without the boilerplate. <code>createSlice</code> generates actions and reducers together, and <code>createAsyncThunk</code> handles async flows cleanly.</p>
<pre><code>import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetch', async (userId) =&gt; {
  const response = await api.getUser(userId);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    clearUser: (state) =&gt; { state.data = null; },
  },
  extraReducers: (builder) =&gt; {
    builder
      .addCase(fetchUser.pending, (state) =&gt; { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) =&gt; {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) =&gt; {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const store = configureStore({
  reducer: { user: userSlice.reducer },
});</code></pre>

<p><strong>Use RTK when:</strong> you have a large team, complex async flows, need Redux DevTools time-travel debugging, or are maintaining an existing Redux codebase.</p>

<h2>Zustand</h2>
<p>Zustand is a single-store solution with a minimal API. The entire store and actions live in one <code>create</code> call, and components only re-render when the specific slice they consume changes:</p>
<pre><code>import { create } from 'zustand';

const useAuthStore = create((set, get) =&gt; ({
  user: null,
  isAuthenticated: false,

  login: async (credentials) =&gt; {
    const user = await api.login(credentials);
    set({ user, isAuthenticated: true });
  },

  logout: () =&gt; {
    set({ user: null, isAuthenticated: false });
    api.clearSession();
  },

  getToken: () =&gt; get().user?.token,
}));

// In a component
function ProfileScreen() {
  const { user, logout } = useAuthStore();
  return &lt;Button title="Sign out" onPress={logout} /&gt;;
}</code></pre>

<p><strong>Use Zustand when:</strong> you want a Redux-like model without the ceremony, or for small-to-medium apps where RTK feels heavyweight.</p>

<h2>Jotai</h2>
<p>Jotai takes the atomic approach: state lives in small, composable atoms rather than a single store. Derived state is computed lazily and cached automatically:</p>
<pre><code>import { atom, useAtom, useAtomValue } from 'jotai';

const userAtom = atom(null);
const themeAtom = atom('dark');

// Derived atom — recomputes only when userAtom changes
const displayNameAtom = atom((get) =&gt; {
  const user = get(userAtom);
  return user ? \`\${user.firstName} \${user.lastName}\` : 'Guest';
});

function Header() {
  const displayName = useAtomValue(displayNameAtom);
  return &lt;Text&gt;Welcome, {displayName}&lt;/Text&gt;;
}</code></pre>

<p><strong>Use Jotai when:</strong> your state is naturally granular — UI state, form fields, feature flags — or you're coming from a Recoil background.</p>

<h2>Bundle Size Comparison</h2>
<ul>
  <li><strong>Zustand:</strong> ~1.2 KB minified + gzipped</li>
  <li><strong>Jotai:</strong> ~3 KB minified + gzipped</li>
  <li><strong>Redux Toolkit (core):</strong> ~11 KB minified + gzipped (includes Immer and Redux)</li>
</ul>
<p>For mobile, bundle size affects startup time. On low-end Android devices, every additional KB matters during the initial JS parse phase. Zustand has a meaningful advantage here.</p>

<h2>Persistence Strategies</h2>
<p>All three libraries persist well with <code>@react-native-async-storage/async-storage</code>.</p>

<p>For <strong>Redux Toolkit</strong>, use <code>redux-persist</code>:</p>
<pre><code>import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);</code></pre>

<p>For <strong>Zustand</strong>, use the built-in <code>persist</code> middleware:</p>
<pre><code>import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(
  persist(
    (set) =&gt; ({ user: null, login: (user) =&gt; set({ user }) }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() =&gt; AsyncStorage),
    }
  )
);</code></pre>

<h2>When to Use Which</h2>
<ul>
  <li><strong>Redux Toolkit:</strong> Large teams, complex async workflows, existing Redux codebase, need for DevTools.</li>
  <li><strong>Zustand:</strong> Medium apps, teams that find Redux verbose, apps with a handful of global state domains.</li>
  <li><strong>Jotai:</strong> Highly granular state, lots of derived/computed values, smaller apps or feature-level state isolation.</li>
</ul>

<h2>My Take</h2>
<p>For most new React Native apps in 2025, I reach for Zustand first. It's small, the mental model is simple enough to onboard a new developer in minutes, and it scales to medium complexity without friction. I introduce RTK when the team is large enough that Redux's structural conventions become a feature rather than a constraint. Jotai earns its place in apps with genuinely atomic state — think a complex form builder or a real-time collaborative tool where individual fields have independent subscription semantics.</p>`,
  },

  {
    slug: "hipaa-compliant-react-native-app",
    title: "Building HIPAA-Compliant Mobile Apps with React Native",
    description:
      "A technical guide to HIPAA compliance for React Native developers — encryption at rest and in transit, Keychain/Keystore, biometric auth, audit logging, PHI handling, and BAA requirements.",
    date: "2025-03-10",
    category: "HealthTech",
    readTime: "8 min read",
    sections: [
      "What HIPAA Means for Mobile Developers",
      "Encryption in Transit",
      "Encryption at Rest",
      "Secure Storage with Keychain and Keystore",
      "Biometric Authentication",
      "Audit Logging",
      "PHI Minimisation",
      "BAA Requirements",
      "Testing for Compliance",
    ],
    mediumLink: null,
    content: `<p>Building a healthcare mobile app is one of the most technically and legally demanding things you can do as a mobile developer. HIPAA violations carry fines up to $1.9 million per violation category per year — and ignorance is not a defence. I've spent the last several years building HealthTech apps in React Native, and this is the practical guide I wish I'd had at the start.</p>

<p><strong>Disclaimer:</strong> This article covers technical implementation patterns. It does not constitute legal advice. Always engage a qualified HIPAA compliance officer and legal counsel for your specific application.</p>

<h2>What HIPAA Means for Mobile Developers</h2>
<p>HIPAA's Security Rule applies to <strong>Protected Health Information (PHI)</strong> — any data that can identify an individual and relates to their health status, healthcare provision, or payment. On a mobile device, PHI might live in network responses, local databases, log files, clipboard content, or screenshots. The Security Rule requires you to protect PHI at rest, in transit, and during disposal — and to maintain an audit trail of who accessed what and when.</p>

<h2>Data Encryption in Transit</h2>
<p>All network communication must use TLS 1.2 or higher. In React Native, <code>fetch</code> and <code>axios</code> use the platform's native HTTP stack, which enforces TLS by default. However, you must also pin your certificate to prevent man-in-the-middle attacks on compromised networks:</p>

<pre><code>// Using react-native-ssl-pinning
import { fetch } from 'react-native-ssl-pinning';

const response = await fetch('https://api.myhealthapp.com/patient', {
  method: 'GET',
  sslPinning: {
    certs: ['api_cert_sha256_hash'],  // SHA256 hash of your server cert
  },
  headers: { Authorization: \`Bearer \${token}\` },
});</code></pre>

<p>On Android, also configure <strong>Network Security Config</strong> to prevent cleartext HTTP traffic entirely:</p>
<pre><code>&lt;!-- android/app/src/main/res/xml/network_security_config.xml --&gt;
&lt;network-security-config&gt;
  &lt;base-config cleartextTrafficPermitted="false"&gt;
    &lt;trust-anchors&gt;
      &lt;certificates src="system" /&gt;
    &lt;/trust-anchors&gt;
  &lt;/base-config&gt;
&lt;/network-security-config&gt;</code></pre>

<h2>Encryption at Rest</h2>
<p>Any PHI stored locally must be encrypted. <code>AsyncStorage</code> is plaintext — never store PHI there. Use <strong>react-native-mmkv</strong> with encryption enabled, or an encrypted SQLite solution with SQLCipher:</p>

<pre><code>import { MMKV } from 'react-native-mmkv';

// Fetch the encryption key from Keychain (covered below)
const encryptionKey = await getKeychainEncryptionKey();

export const secureStorage = new MMKV({
  id: 'phi-storage',
  encryptionKey,  // AES-256 encryption
});</code></pre>

<pre><code>// SQLite with SQLCipher
import { open } from 'react-native-quick-sqlite';

const db = open({
  name: 'health.db',
  encryptionKey: encryptionKey,  // SQLCipher AES-256
});</code></pre>

<h2>Secure Storage with Keychain and Keystore</h2>
<p>Encryption keys and auth tokens must never live in AsyncStorage. Use the platform's hardware-backed secure enclave — iOS Keychain and Android Keystore — via <code>react-native-keychain</code>:</p>

<pre><code>import * as Keychain from 'react-native-keychain';

// Store a credential securely
await Keychain.setGenericPassword('user', authToken, {
  service: 'com.myhealthapp.auth',
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
});

// Retrieve a credential
const credentials = await Keychain.getGenericPassword({
  service: 'com.myhealthapp.auth',
});

// Revoke on logout
await Keychain.resetGenericPassword({ service: 'com.myhealthapp.auth' });</code></pre>

<p><code>WHEN_UNLOCKED_THIS_DEVICE_ONLY</code> means the item is inaccessible if the device is locked and cannot migrate to a new device via iCloud backup — both critical for PHI.</p>

<h2>Biometric Authentication</h2>
<p>HIPAA requires access controls. Biometric authentication (Face ID, Touch ID, fingerprint) satisfies the "unique user identification" requirement and provides a strong second factor for app access:</p>

<pre><code>import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateUser() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return promptForPIN();  // fall back to PIN
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Verify your identity to access patient data',
    fallbackLabel: 'Use PIN',
    disableDeviceFallback: false,
  });

  return result.success;
}</code></pre>

<h2>Audit Logging</h2>
<p>The HIPAA Security Rule requires activity logs for all PHI access. Every read, write, or delete of patient data must be recorded with a timestamp, user ID, action type, and the resource accessed:</p>

<pre><code>const AuditAction = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  EXPORT: 'EXPORT',
};

export async function logAuditEvent(action, resourceType, resourceId) {
  const entry = {
    timestamp: new Date().toISOString(),
    userId: authStore.userId,
    action,
    resourceType,
    resourceId,
    deviceId: await getDeviceId(),
  };

  // Write locally first, then sync to server
  auditQueue.push(entry);
  await syncAuditQueue();
}

// Usage
await logAuditEvent(AuditAction.VIEW, 'PatientRecord', patientId);</code></pre>

<h2>PHI Minimisation</h2>
<p>Only request and store PHI that is necessary for the app's function. Practical steps:</p>
<ul>
  <li>Disable screenshots on screens displaying PHI using <code>react-native-prevent-screenshot</code> or Android's <code>FLAG_SECURE</code>.</li>
  <li>Clear the clipboard after any copy action involving PHI.</li>
  <li>Exclude PHI-bearing directories from iCloud and Android auto-backup.</li>
  <li>Set aggressive session timeouts — auto-lock after 5–15 minutes of inactivity.</li>
</ul>

<pre><code>&lt;!-- Exclude from Android backup in AndroidManifest.xml --&gt;
&lt;application
  android:allowBackup="false"
  android:fullBackupContent="@xml/backup_rules"
&gt;</code></pre>

<h2>BAA Requirements</h2>
<p>Every third-party service that processes PHI on your behalf must sign a Business Associate Agreement (BAA). This includes your cloud hosting provider, analytics platform, crash reporting service, and push notification provider. AWS, Google Cloud, Azure, and Firebase all offer BAA-eligible tiers. Standard free tiers of services like Sentry or Mixpanel typically do not include BAAs — you cannot send PHI to those endpoints without a signed agreement.</p>

<h2>Testing for Compliance</h2>
<ul>
  <li>Run <strong>OWASP Mobile Security Testing Guide</strong> (MSTG) checks against your app binary.</li>
  <li>Use <strong>Frida</strong> or <strong>Objection</strong> to verify that Keychain items are not accessible on a jailbroken or rooted device without authentication.</li>
  <li>Verify with a network proxy (Charles, mitmproxy) that certificate pinning is enforced and no cleartext traffic is sent.</li>
  <li>Review crash reports and analytics events to confirm no PHI appears in log output.</li>
  <li>Conduct a penetration test before launch — many healthcare clients require a signed pen-test report as a condition of deployment.</li>
</ul>

<p>HIPAA compliance is not a feature you add at the end of a project. It's an architectural decision that affects your data model, third-party dependencies, CI/CD pipeline, and release process. The teams I've seen handle it best are the ones who embed a compliance checklist into their definition of done from day one — treating security as a first-class concern, not an afterthought.</p>`,
    faq: [
      {
        question: "How do I make a React Native app HIPAA compliant?",
        answer: "You need encryption at rest and in transit (TLS 1.2+), secure storage using Keychain on iOS and Keystore on Android, biometric authentication, audit logging of all PHI access, PHI minimisation, and a Business Associate Agreement (BAA) with every third-party service that handles protected health information."
      },
      {
        question: "What is PHI and how should I handle it in a mobile app?",
        answer: "Protected Health Information (PHI) is any data that can identify an individual and relates to their health status, healthcare provision, or payment. On mobile, PHI can exist in network responses, local databases, log files, clipboard content, or screenshots. Minimise PHI storage on-device, encrypt what you must store, and maintain an audit trail of all access."
      },
      {
        question: "Do I need a BAA for my React Native healthcare app?",
        answer: "Yes. A Business Associate Agreement is required with every third-party service that processes, stores, or transmits PHI on your behalf. This includes cloud providers, analytics services, crash reporting tools, and push notification services. Without a signed BAA, using that service with PHI is a HIPAA violation."
      },
    ],
  },

  {
    slug: "claude-code-react-native-development",
    title: "How I Use Claude Code to Build React Native Apps 10x Faster",
    description:
      "Learn how Claude Code (Anthropic's AI coding assistant) supercharges React Native development — from scaffolding components to debugging builds and writing tests.",
    date: "2025-03-14",
    category: "AI + React Native",
    readTime: "7 min read",
    sections: [
      "What Is Claude Code?",
      "Setting It Up for React Native",
      "Generating Components and Navigation",
      "Debugging Native Build Errors",
      "State Management and Testing",
      "Expo vs Bare Workflow",
      "Prompting Tips for Mobile Dev",
      "Claude Code vs GitHub Copilot",
    ],
    mediumLink: null,
    content: `<p>Six months ago I started treating Claude Code less like a search engine and more like a senior mobile engineer sitting next to me. The result? Scaffolding that used to take half a day now takes twenty minutes, native build errors I would have spent hours Googling get resolved in one prompt, and my test coverage has quietly crept up because generating Jest tests no longer feels like a chore. In my daily workflow, Claude Code has become the single biggest productivity lever I have.</p>

<h2>What Is Claude Code?</h2>
<p>Claude Code is Anthropic's terminal-native AI coding assistant. Unlike a chat window or IDE plugin, it runs directly in your shell and has full read/write access to your project directory. You invoke it with <code>claude</code>, ask it to read files, generate code, run commands, or reason over your entire codebase — all without leaving the terminal. It is powered by Claude, the same model behind Anthropic's consumer products, but optimised for long-context code tasks where file awareness and multi-step reasoning matter.</p>

<p>The key distinction from tab-completion tools is that Claude Code understands <em>intent at the project level</em>. When I ask it to "add a profile screen to the existing navigation," it reads the navigator file, identifies the pattern used for other screens, matches the naming convention, and writes code that slots in correctly — not generic boilerplate I have to rewrite half of.</p>

<h2>Setting It Up for a React Native Project</h2>
<p>Installation is a single npm command:</p>

<pre><code>npm install -g @anthropic-ai/claude-code
claude</code></pre>

<p>On first launch it authenticates against your Anthropic account. After that, navigate to your React Native project root and start a session. I keep a <code>CLAUDE.md</code> file at the project root that Claude Code reads automatically. Mine contains:</p>

<ul>
  <li>The navigation library in use (React Navigation v6, stack + bottom tabs)</li>
  <li>The state solution (Zustand with persist middleware)</li>
  <li>API base URL and authentication pattern</li>
  <li>Testing setup (Jest + React Native Testing Library)</li>
  <li>Code style notes (TypeScript strict mode, functional components only)</li>
</ul>

<p>This context file is the single best investment you can make. Every session starts with Claude Code knowing your project's conventions, so you never have to re-explain your architecture.</p>

<h2>Generating Components and Navigation Logic</h2>
<p>I've found Claude Code especially useful for the mechanical parts of component creation. A prompt like "create a UserAvatarWithBadge component that accepts size, imageUri, and badgeCount props, uses our existing theme tokens from src/theme/colors.ts, and includes a Skeleton loading state" produces a complete, correctly typed component in one shot — imports, StyleSheet, prop types, and all.</p>

<p>Navigation is where I save the most time. Setting up a new authenticated flow — splash screen, onboarding, auth stack, main tab navigator — used to mean half a day reading React Navigation docs and debugging TypeScript route params. Now I describe the flow in plain English and review the output:</p>

<pre><code>// Prompt: "Add a two-screen onboarding flow between the splash screen
// and the main tab navigator. Screen 1 collects the user's name,
// screen 2 asks for notification permissions. Both screens should
// use the existing OnboardingLayout wrapper."

// Claude Code reads RootNavigator.tsx, identifies the existing
// pattern, and produces the correct stack navigator insertion.</code></pre>

<p>The output is not always perfect — I typically review it, request a tweak or two, and commit. But the first draft is close enough that I spend fifteen minutes reviewing rather than ninety minutes writing.</p>

<h2>Debugging Native Build Errors</h2>
<p>This is where Claude Code genuinely earns its keep. Native build errors — Gradle failures, Xcode signing issues, CocoaPods conflicts, NDK version mismatches — are notorious for producing cryptic error messages that require deep platform knowledge to interpret. I paste the full error output into Claude Code and ask it to diagnose the root cause.</p>

<p>A recent example: after upgrading <code>react-native-reanimated</code> to v3, my Gradle build broke with a <code>Duplicate class kotlin.collections.jdk8</code> error. Claude Code identified the root cause (a Kotlin BOM version conflict), showed me exactly where to add the resolution block in <code>build.gradle</code>, and explained why the conflict occurred. Total time: four minutes. Without it, that error had cost me two hours on a previous project.</p>

<pre><code># In android/build.gradle — solution Claude Code produced:
configurations.all {
  resolutionStrategy {
    force "org.jetbrains.kotlin:kotlin-stdlib:1.8.0"
  }
}</code></pre>

<h2>Creating Redux and Zustand Stores</h2>
<p>In my daily workflow, state management scaffolding is one of the most repetitive tasks in React Native development. A Zustand store for a new feature domain — actions, selectors, persistence, TypeScript types, and a custom hook — is forty to eighty lines of code that follow an almost identical pattern every time. Claude Code generates this in under a minute:</p>

<pre><code>// Prompt: "Create a Zustand store for cart management. It needs
// addItem, removeItem, updateQuantity, and clearCart actions.
// Persist to AsyncStorage. Export a useCart hook."</code></pre>

<p>The resulting store is correctly typed, uses the <code>persist</code> middleware wired to <code>AsyncStorage</code>, and the hook follows our naming convention. I review, merge with the existing store index, and I'm done.</p>

<h2>Writing Unit Tests with Jest</h2>
<p>Test coverage suffers on most mobile teams not because developers don't care but because writing tests is time-consuming when features are shipping fast. Claude Code removes a large portion of that friction. After implementing a component or utility, I ask Claude Code to write the Jest tests:</p>

<pre><code>// Prompt: "Write Jest tests for the useCartTotal hook in
// src/hooks/useCartTotal.ts. Cover: empty cart returns 0,
// single item, multiple items, items with quantity > 1,
// and applying a discount code."</code></pre>

<p>The tests it generates are thoughtful — they cover edge cases I would have missed in a rush, mock dependencies correctly, and use React Native Testing Library's <code>renderHook</code> where appropriate. My test coverage on recent features has gone from a typical 40% to consistently above 70%, which has caught several regressions before they reached review.</p>

<h2>Expo and Bare Workflow Support</h2>
<p>Claude Code works equally well with Expo managed workflow and bare React Native projects. For Expo projects, I include the SDK version and any config plugins in <code>CLAUDE.md</code>. This means when I ask for a native module integration, Claude Code knows to suggest an Expo-compatible package and write the <code>app.config.js</code> plugin entry rather than raw native code.</p>

<p>For bare workflow projects, it understands that both Android and iOS native files are in play. When I ask it to add a capability — say, background fetch — it produces both the <code>Info.plist</code> changes and the Android manifest updates in the same response. No more cross-referencing two platform docs simultaneously.</p>

<h2>Prompting Tips for Mobile Development</h2>
<p>Effective prompting for React Native work comes down to a few habits I've developed over months of use:</p>

<ul>
  <li><strong>Reference real files.</strong> "Look at src/components/Button.tsx and create a similar IconButton component" produces far better output than a generic description.</li>
  <li><strong>State constraints upfront.</strong> "TypeScript strict mode, no any types, functional component with hooks only" prevents back-and-forth.</li>
  <li><strong>Ask for reasoning on errors.</strong> "Explain why this error occurs before giving the fix" helps you learn and builds better institutional knowledge than copy-paste fixes.</li>
  <li><strong>Iterate in the same session.</strong> Claude Code maintains context across turns. A refinement prompt ("now add loading and error states to that component") costs nothing and usually takes one follow-up.</li>
  <li><strong>Use it for code reviews.</strong> "Review this PR diff for common React Native performance anti-patterns" is one of my favourite uses — it catches <code>inline styles</code>, missing <code>useCallback</code> on list item renderers, and re-render issues I'd otherwise miss.</li>
</ul>

<h2>Claude Code vs GitHub Copilot for React Native</h2>
<p>Copilot excels at inline autocomplete — finishing the next line or a short function based on what you're typing. It's fast and unobtrusive inside an IDE. Claude Code plays a different game: it reasons over entire files and entire sessions, handles multi-step tasks, and is substantially better at platform-specific React Native knowledge — particularly native build systems, platform configuration, and cross-platform code patterns.</p>

<p>In practice I find Copilot more useful for the low-level typing assistance and Claude Code more useful for anything requiring architectural thinking, debugging complex errors, or generating a coherent multi-file feature implementation. The two tools are complementary rather than competing. If I had to pick one for React Native work specifically, I would choose Claude Code without hesitation — the native build debugging capability alone justifies it.</p>

<p>The broader shift I've noticed is that the work Claude Code handles best — boilerplate, test stubs, configuration, error diagnosis — is also the work that used to quietly drain morale. Removing that friction doesn't just save time; it makes the interesting parts of React Native development more enjoyable. That's a compounding return worth paying attention to.</p>`,
  },

  {
    slug: "callstack-react-native-tools-2025",
    title: "Callstack's React Native Ecosystem: Tools Every Developer Should Know",
    description:
      "Explore Callstack's open-source contributions to React Native — from react-native-paper to react-native-builder-bob and their latest developer tools.",
    date: "2025-03-12",
    category: "React Native",
    readTime: "6 min read",
    sections: [
      "Who Is Callstack?",
      "react-native-paper",
      "react-native-builder-bob",
      "Re.Pack and Micro-Frontends",
      "React Native Testing Library",
      "Linaria and CSS-in-JS",
      "React Native CLI and Core Contributions",
      "Why Callstack Tools Matter in Production",
    ],
    mediumLink: null,
    content: `<p>If you have spent any serious time in the React Native ecosystem, you have almost certainly used a Callstack tool without realising it. The Wroclaw-based consultancy and open-source powerhouse has quietly become one of the most influential forces in the React Native community — not through marketing but through consistently excellent engineering. I've been using their tools across projects for three years, and understanding what they've built and why gives you a real edge as a React Native developer.</p>

<h2>Who Is Callstack?</h2>
<p><a href="https://callstack.com" target="_blank" rel="noopener">Callstack</a> is a React Native consultancy founded in 2015 that has grown into one of the largest contributors to the React Native open-source ecosystem. They maintain the official <strong>React Native CLI</strong>, employ several React Native core team members, and have pioneered tooling for testing, library authoring, micro-frontend architecture, and UI component design. Their open-source output is remarkable in both volume and quality — every tool solves a real problem they encountered while shipping production apps.</p>

<h2>react-native-paper: Material Design Done Right</h2>
<p>I've been using <code>react-native-paper</code> in several projects and it consistently impresses me with how thoroughly it implements Material Design 3 without sacrificing customisation. It provides a complete set of production-ready components — buttons, cards, dialogs, text fields, chips, navigation drawers, and more — all built with accessibility, theming, and React Native performance in mind.</p>

<pre><code>import { Button, Card, Text, useTheme } from 'react-native-paper';

function ProductCard({ title, price, onPress }) {
  const theme = useTheme();
  return (
    &lt;Card style={{ margin: 8 }}&gt;
      &lt;Card.Content&gt;
        &lt;Text variant="titleMedium"&gt;{title}&lt;/Text&gt;
        &lt;Text variant="bodySmall" style={{ color: theme.colors.secondary }}&gt;
          \${price}
        &lt;/Text&gt;
      &lt;/Card.Content&gt;
      &lt;Card.Actions&gt;
        &lt;Button onPress={onPress}&gt;Add to Cart&lt;/Button&gt;
      &lt;/Card.Actions&gt;
    &lt;/Card&gt;
  );
}</code></pre>

<p>The theming system is one of its strongest features. You define a theme once using <code>MD3LightTheme</code> or <code>MD3DarkTheme</code> as a base, override your brand colours, and every component in the tree inherits the result. Dark mode support comes for free. For teams without a dedicated design system, react-native-paper provides a solid, consistent visual foundation that reduces design debt significantly.</p>

<h2>react-native-builder-bob: The Library Scaffolding Standard</h2>
<p><code>react-native-builder-bob</code> has become the de facto standard for creating and building React Native libraries. If you plan to publish a React Native package to npm — whether a UI component, a native module, or a utility library — builder-bob handles the build pipeline so you don't have to wrestle with TypeScript compilation, CommonJS vs ESM output, and native code configuration.</p>

<pre><code># Scaffold a new library
npx create-react-native-library@latest my-awesome-lib

# Build outputs (configured in package.json)
npx bob build</code></pre>

<p>It supports multiple output targets: CommonJS for older bundlers, ES modules for tree-shaking, and TypeScript declaration files. For libraries with native modules it generates the correct Kotlin and Swift stubs and wires the autolinking configuration. The result is a library that works correctly across Expo managed, Expo bare, and plain React Native projects with zero consumer configuration.</p>

<h2>Re.Pack: Webpack for React Native and Micro-Frontends</h2>
<p>Re.Pack is Callstack's Webpack-based bundler for React Native, and it solves a problem that Metro — React Native's default bundler — simply cannot: <strong>true micro-frontend architecture</strong>. In a standard Metro setup, all modules are bundled into a single JavaScript bundle at build time. Re.Pack enables Module Federation, which means you can split your app into independently deployable JavaScript chunks that are loaded at runtime.</p>

<p>This matters enormously for large organisations. A super-app that hosts multiple mini-apps (think WeChat, Grab, or enterprise portals) can ship individual feature teams' code independently without rebuilding and releasing the host app. Each mini-app is a separate Webpack bundle, federated into the host at runtime:</p>

<pre><code>// webpack.config.js (host app)
new Repack.plugins.ModuleFederationPlugin({
  name: 'HostApp',
  remotes: {
    CheckoutMiniApp: 'CheckoutMiniApp@dynamic', // loaded at runtime
    ProfileMiniApp: 'ProfileMiniApp@dynamic',
  },
})</code></pre>

<p>Haul, Re.Pack's predecessor, was an earlier attempt at Webpack-based bundling for React Native. Callstack officially deprecated it in favour of Re.Pack, which is built on Webpack 5 and supports the full Module Federation specification. If you're still running Haul, the migration path to Re.Pack is well-documented on their site.</p>

<h2>React Native Testing Library</h2>
<p>Originally created by Callstack engineer Maciej Jastrzebski, <code>@testing-library/react-native</code> is now the recommended testing library for React Native components. It extends the Testing Library philosophy — test behaviour, not implementation — to the mobile context.</p>

<pre><code>import { render, screen, fireEvent } from '@testing-library/react-native';

test('shows error when email is invalid', () => {
  render(&lt;LoginForm /&gt;);
  fireEvent.changeText(screen.getByPlaceholderText('Email'), 'notanemail');
  fireEvent.press(screen.getByText('Sign In'));
  expect(screen.getByText('Please enter a valid email')).toBeOnTheScreen();
});</code></pre>

<p>I've found this approach produces tests that survive refactors far better than enzyme-style shallow rendering. Because queries target accessible labels, placeholder text, and visible text rather than component internals, renaming a state variable or splitting a component doesn't break the test suite. That stability is worth a great deal on a long-running project.</p>

<h2>Linaria: Zero-Runtime CSS-in-JS</h2>
<p>Linaria is Callstack's answer to the performance cost of runtime CSS-in-JS libraries. It extracts styles at build time — no style object created at runtime, no JavaScript overhead per render. While Linaria is primarily a web tool, its principles have influenced how the React Native community thinks about styling performance, and it's directly useful for React Native Web projects where you want consistent, performant styling across platforms.</p>

<h2>React Native CLI and Core Contributions</h2>
<p>Callstack maintains the official <code>@react-native-community/cli</code> — the tool you use every time you run <code>npx react-native run-android</code> or <code>npx react-native run-ios</code>. They also have multiple engineers working directly on React Native core, with significant contributions to the New Architecture (Fabric renderer, JSI, TurboModules). Their work on the new architecture migration tooling has lowered the barrier to entry for production apps adopting bridgeless mode.</p>

<blockquote>
  <p>Callstack's philosophy is that the best way to improve React Native is to use it at scale, feel the pain yourself, and build the tools to fix it. That virtuous cycle is why their open-source output is consistently practical rather than theoretical.</p>
</blockquote>

<h2>Why Callstack's Tools Matter for Production Apps</h2>
<p>The common thread across everything Callstack builds is that it solves real problems encountered while shipping real apps. react-native-paper is the result of building consumer-facing apps that need polished UI fast. Builder-bob is the result of maintaining many open-source packages simultaneously. Re.Pack is the result of actually shipping a super-app in production and discovering Metro's limits. React Native Testing Library is the result of writing thousands of brittle tests and deciding there had to be a better way.</p>

<p>For a React Native developer building production software, Callstack's ecosystem represents years of hard-won knowledge packaged into tools you can drop into your project today. If you haven't explored their full portfolio, start with the <a href="https://github.com/callstack" target="_blank" rel="noopener">Callstack GitHub organisation</a> — it's one of the most productive afternoons you can spend as a mobile developer.</p>`,
  },

  {
    slug: "vercel-expo-react-native-web",
    title: "Using Vercel with Expo and React Native Web for Universal Apps",
    description:
      "Deploy React Native apps to the web using Expo, React Native Web, and Vercel. Build truly universal apps that run on iOS, Android, and the web.",
    date: "2025-03-08",
    category: "React Native",
    readTime: "7 min read",
    sections: [
      "The Universal App Concept",
      "Expo Web and React Native Web",
      "Project Setup for Web",
      "Deploying to Vercel",
      "Platform-Specific Code",
      "Navigation on the Web",
      "SEO for React Native Web",
      "Vercel Edge Functions with Expo",
      "Real-World Use Case",
    ],
    mediumLink: null,
    content: `<p>The promise of React Native has always been "learn once, write anywhere" — but for years, web support felt like a second-class citizen. In 2025, that has changed meaningfully. Expo's web support is stable, React Native Web is mature, and Vercel's deployment experience is seamless enough that I now ship several apps that share a single codebase across iOS, Android, and the web. Here's everything I've learned about making that architecture work in production.</p>

<h2>The Universal App Concept</h2>
<p>A universal app maintains one JavaScript and TypeScript codebase that compiles to native iOS, native Android, and a web application. The components, business logic, API calls, state management, and navigation structure are shared. Only the truly platform-specific behaviour — camera access, push notifications, native gestures — diverges into platform-specific files.</p>

<p>This is different from a responsive web app with a companion mobile app. The code is the same. A bug fix, a new feature, an API change — it propagates to all three platforms in a single pull request. For small teams or solo developers maintaining a product across surfaces, this is transformative.</p>

<h2>Expo Web and React Native Web</h2>
<p>Expo's web support is powered by <a href="https://necolas.github.io/react-native-web/" target="_blank" rel="noopener">React Native Web</a>, a library by Nicolas Gallagher (now at Meta) that implements the React Native component and API surface on top of the DOM. <code>View</code> becomes a <code>div</code>, <code>Text</code> becomes a <code>span</code>, <code>Image</code> becomes an <code>img</code>, and <code>StyleSheet</code> compiles to CSS classes. The mapping is not perfect — complex native animations and some platform APIs have no web equivalent — but the vast majority of UI and logic translates cleanly.</p>

<p>Expo uses Metro (or optionally Webpack via <code>@expo/webpack-config</code>) to bundle the web output. Starting from Expo SDK 50, the default web bundler switched to Metro with web support, which aligns the bundling experience with native and dramatically improves build times.</p>

<h2>Setting Up a React Native Project for Web</h2>
<p>If you're starting fresh, create an Expo project with web support included:</p>

<pre><code>npx create-expo-app@latest my-universal-app
cd my-universal-app
npx expo install react-native-web react-dom @expo/metro-runtime</code></pre>

<p>For an existing Expo project, add the web dependencies and ensure your <code>app.json</code> includes a web configuration:</p>

<pre><code>// app.json
{
  "expo": {
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    }
  }
}</code></pre>

<p>Setting <code>"output": "static"</code> tells Expo to generate a static HTML export — critical for Vercel deployment and SEO. Run <code>npx expo export --platform web</code> to verify the build produces a <code>dist/</code> directory before you touch any deployment configuration.</p>

<h2>Configuring Vercel for Expo Web Builds</h2>
<p>Vercel's zero-configuration deployment works well with Expo's static export. Connect your repository, and set the following in your Vercel project settings:</p>

<ul>
  <li><strong>Build Command:</strong> <code>npx expo export --platform web</code></li>
  <li><strong>Output Directory:</strong> <code>dist</code></li>
  <li><strong>Install Command:</strong> <code>npm install</code> (or <code>yarn install</code>)</li>
  <li><strong>Node.js Version:</strong> 20.x</li>
</ul>

<p>Alternatively, add a <code>vercel.json</code> at the project root to version-control the build configuration:</p>

<pre><code>{
  "buildCommand": "npx expo export --platform web",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}</code></pre>

<p>The rewrite rule is essential for single-page app routing — without it, directly navigating to a deep link like <code>/profile/settings</code> returns a 404 because the file doesn't exist at that path in the static output. The rewrite ensures all routes serve <code>index.html</code> and React Navigation handles the rest client-side.</p>

<h2>Platform-Specific Code</h2>
<p>Not every API works on every platform. React Native provides two clean mechanisms for platform-specific code that I use regularly.</p>

<p>The first is <code>Platform.select</code>, which is suitable for small inline differences:</p>

<pre><code>import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: 44,
      android: 24,
      web: 0,
    }),
    cursor: Platform.select({ web: 'pointer', default: undefined }),
  },
});</code></pre>

<p>The second is file-based platform extensions, which are better for larger divergences. If you create <code>UserAvatar.web.tsx</code> alongside <code>UserAvatar.tsx</code>, Metro and Webpack will automatically import the <code>.web.tsx</code> file when bundling for web. I use this for anything that requires a fundamentally different implementation — a date picker that should use a native modal on mobile but an <code>&lt;input type="date"&gt;</code> on web, for example.</p>

<h2>Navigation on the Web</h2>
<p>React Navigation v6+ has solid web support. URL-based routing, browser history integration, and linking configuration all work with the same API used for native deep linking. The key is configuring the <code>linking</code> prop on your <code>NavigationContainer</code>:</p>

<pre><code>const linking = {
  prefixes: ['https://myapp.com', 'myapp://'],
  config: {
    screens: {
      Home: '',
      Profile: 'profile/:userId',
      Settings: 'settings',
    },
  },
};

&lt;NavigationContainer linking={linking}&gt;
  {/* your navigators */}
&lt;/NavigationContainer&gt;</code></pre>

<p>With this in place, navigating to <code>https://myapp.com/profile/123</code> in a browser opens the Profile screen with <code>userId</code> set to <code>'123'</code> — the same URL that would deep-link into the native app. The parity between web and native routing is one of my favourite aspects of this architecture.</p>

<h2>SEO Considerations for React Native Web Apps</h2>
<p>A purely client-side React Native Web app has limited SEO potential — search engines see an empty HTML shell until JavaScript loads. For content that needs to rank, you have two options.</p>

<p>The first is static export with pre-rendered pages, which Expo's <code>"output": "static"</code> mode provides. For a portfolio, marketing site, or blog built on this stack, static export gives you HTML that search engines can index directly without executing JavaScript.</p>

<p>The second is adding <code>&lt;head&gt;</code> metadata. Expo supports this via <code>expo-head</code> (part of Expo Router) or the <code>react-native-helmet-async</code> package, which writes <code>&lt;title&gt;</code>, <code>&lt;meta name="description"&gt;</code>, and Open Graph tags into the document head:</p>

<pre><code>import { Stack } from 'expo-router';

// Using Expo Router's built-in head management
&lt;Stack.Screen
  options={{
    title: 'My Profile',
    // On web, this sets the document title and meta tags
  }}
/&gt;</code></pre>

<h2>Vercel Edge Functions with Expo API Routes</h2>
<p>Expo Router's API routes feature — introduced in SDK 50 — lets you write server-side endpoints that co-locate with your app code. When deployed to Vercel, these become serverless functions or edge functions automatically. I use this for form submissions, webhooks, and lightweight data fetching that shouldn't happen client-side:</p>

<pre><code>// app/api/contact+api.ts
export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  await sendEmail({ name, email, message });
  return Response.json({ success: true });
}</code></pre>

<p>Vercel detects the API routes in the <code>dist</code> output and provisions the appropriate serverless infrastructure. The endpoint is available at <code>/api/contact</code>, callable from both the web version of your app and the native app. One codebase, one deployment, both surfaces served.</p>

<h2>Real-World Use Case: A Portfolio That Shares Mobile Code</h2>
<p>My own portfolio is built on exactly this stack. The web version deploys to Vercel and serves static HTML with proper meta tags. The same codebase, with a few platform-specific files for native features, builds to an Expo Go-compatible app. Shared components include the project cards, the contact form logic, the skills section, and all the theme definitions. Only the navigation chrome and a handful of native-specific interactions diverge.</p>

<p>The practical benefit is that I maintain one design system, one set of components, and one test suite. When I update my project list or change a colour, I push once and all three targets — iOS, Android, web — are updated on the next build. For a solo developer, this is an enormous quality-of-life improvement over maintaining parallel codebases.</p>

<blockquote>
  <p>The combination of Expo's mature web support, React Native Web's faithful component mapping, and Vercel's frictionless deployment has made universal apps a realistic production choice rather than an aspirational one.</p>
</blockquote>

<p>If you're building a new product in 2025 and you know it needs both a mobile app and a web presence, starting with this universal architecture costs almost nothing extra upfront and saves significant effort as the product grows. The tooling is there, the deployment story is smooth, and the developer experience has never been better. Start with a new Expo project, get the web export working locally, connect it to Vercel, and you'll be shipping to three platforms before the end of the day.</p>`,
  },
  {
    slug: "callstack-mobile-tester-agent",
    title:
      "Callstack's Mobile Tester Agent: AI-Powered Testing for React Native Apps",
    description:
      "Callstack just launched Mobile Tester Agent — an AI agent that autonomously tests your React Native app on real devices. Here's what it means for mobile QA.",
    date: "2025-03-15",
    category: "AI + React Native",
    readTime: "7 min read",
    sections: [
      "What Is Mobile Tester Agent?",
      "How It Works",
      "Setting Up Mobile Tester Agent",
      "Writing Test Scenarios",
      "Real Device Testing",
      "Comparison with Detox and Maestro",
      "The Future of Mobile QA",
      "Getting Started",
    ],
    mediumLink: null,
    content: `<p>I've been experimenting with AI-assisted tooling in my React Native workflow for a while now, but Callstack's newly launched Mobile Tester Agent is the first tool that genuinely made me stop and reconsider how I think about mobile QA. If you've ever spent an afternoon untangling broken Detox selectors after a UI refactor, or wrestled with Appium's driver setup at 11pm before a release, this is worth your attention.</p>

<h2>What Is Mobile Tester Agent?</h2>
<p>Mobile Tester Agent is an AI-powered testing agent built by Callstack — the same team behind Re.Pack, react-native-paper, and React Native Testing Library. Unlike traditional end-to-end testing frameworks, it doesn't rely on element selectors, accessibility IDs, or pre-compiled test scripts. Instead, it uses a visual AI model to understand your app's UI at runtime and execute test scenarios written in plain English.</p>

<p>The core idea is straightforward: you describe what you want to test in natural language, and the agent figures out the rest. It visually identifies buttons, input fields, navigation elements, and content on the screen — the same way a human tester would — then taps, types, scrolls, and swipes its way through your app to verify the expected behaviour.</p>

<h2>How It Works</h2>
<p>Under the hood, Mobile Tester Agent connects to a running app instance — either a simulator, an emulator, or a real physical device — and captures screenshots at each interaction step. A multimodal vision model analyses each frame to determine what is currently visible and what action is needed next to progress toward the test goal.</p>

<p>The agent operates in a continuous loop: observe the screen, reason about the next action, execute the action, observe the result. This loop continues until the scenario is either verified successfully or a failure condition is detected. Because the agent reasons from pixels rather than a DOM or accessibility tree, it handles dynamically rendered content, animations, and loading states in a way that selector-based tools simply cannot.</p>

<p>In my experience, this observation-action loop is where Mobile Tester Agent earns its place. Traditional E2E tests fail silently when a loading spinner delays an element's appearance. The agent waits, reasons that the app is still loading, and tries again — behaviour that previously required explicit wait conditions and retry logic scattered across your test suite.</p>

<h2>Setting Up Mobile Tester Agent</h2>
<p>Setup is considerably lighter than Detox or Appium. You install the agent package, provide an API key for the underlying vision model, and point it at your running app. For a standard Expo or React Native CLI project the configuration looks roughly like this:</p>

<pre><code># Install the agent CLI
npm install --save-dev @callstack/mobile-tester-agent

# Create a config file
touch mobile-tester.config.js</code></pre>

<pre><code>// mobile-tester.config.js
module.exports = {
  platform: 'ios',       // 'ios' | 'android'
  target: 'simulator',   // 'simulator' | 'emulator' | 'device'
  apiKey: process.env.MOBILE_TESTER_API_KEY,
  screenshotInterval: 500,
};</code></pre>

<p>There is no Gradle plugin to configure, no Detox binary to compile, and no XCUITest runner to provision. You start your app normally — <code>npx expo start</code> or <code>npx react-native run-ios</code> — and then invoke the agent against the running instance. For teams that have struggled with Detox's build-time setup, this alone is a significant quality-of-life improvement.</p>

<h2>Writing Test Scenarios</h2>
<p>This is where Mobile Tester Agent departs most dramatically from conventional testing tools. Tests are not code. They are natural language descriptions of user journeys. Here are three scenarios I've been running against a sample e-commerce app:</p>

<pre><code>// scenarios/auth.test.txt
Log in with the email "test@example.com" and password "Test1234!".
Navigate to the Profile tab.
Verify that the user's name "Alex Johnson" is displayed on screen.</code></pre>

<pre><code>// scenarios/cart.test.txt
Add 3 items to the shopping cart from the product listing page.
Navigate to the cart screen.
Apply the promo code "SAVE20" in the discount field.
Verify that the order total reflects a 20% discount.</code></pre>

<pre><code>// scenarios/onboarding.test.txt
Launch the app for the first time as a new user.
Swipe through all onboarding screens.
Tap "Skip" on the final screen.
Verify that the home screen loads and the main navigation is visible.</code></pre>

<p>Each scenario reads like a manual QA test case — because that's essentially what it is. The agent interprets these instructions, translates them into device interactions, and reports back with a pass/fail result along with screenshots captured at each step. Non-developers can write these. A product manager can write these. That is not a small thing for teams where QA coverage has historically been gated on engineering time.</p>

<h2>Real Device Testing</h2>
<p>One of the more compelling capabilities is genuine real-device support. Simulator and emulator testing catches most regressions, but hardware-specific behaviour — font rendering differences, actual touch latency, real network conditions — has always required physical devices. Mobile Tester Agent connects to real devices over ADB on Android and via the standard iOS device tunnel on iOS.</p>

<p>In my testing against a physical iPhone 14, the agent handled the higher-resolution screenshots without any configuration changes. The vision model adapted to the actual pixel density and the slightly different rendering of system fonts on real hardware versus the simulator. That adaptability is exactly what you want from a visual testing approach — no magic strings, no device-specific selectors, no separate test branches for device versus simulator runs.</p>

<h2>Comparison with Detox and Maestro</h2>
<p>To be direct about where each tool fits, here is how Mobile Tester Agent compares to the two most popular alternatives in the React Native ecosystem today:</p>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Mobile Tester Agent</th>
      <th>Detox</th>
      <th>Maestro</th>
      <th>Appium</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Test language</td>
      <td>Plain English</td>
      <td>JavaScript/TypeScript</td>
      <td>YAML</td>
      <td>Java / JS / Python</td>
    </tr>
    <tr>
      <td>UI interaction method</td>
      <td>Visual AI</td>
      <td>Accessibility IDs / selectors</td>
      <td>Accessibility IDs / text</td>
      <td>XPath / selectors</td>
    </tr>
    <tr>
      <td>Setup complexity</td>
      <td>Low</td>
      <td>High (build config required)</td>
      <td>Medium</td>
      <td>Very high</td>
    </tr>
    <tr>
      <td>Selector brittleness</td>
      <td>None</td>
      <td>High</td>
      <td>Medium</td>
      <td>Very high</td>
    </tr>
    <tr>
      <td>Execution speed</td>
      <td>Slower (vision model latency)</td>
      <td>Fast</td>
      <td>Fast</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td>CI/CD integration</td>
      <td>Early support</td>
      <td>Mature</td>
      <td>Mature</td>
      <td>Mature</td>
    </tr>
    <tr>
      <td>Non-developer authoring</td>
      <td>Yes</td>
      <td>No</td>
      <td>Partially</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Real device support</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

<p>Detox remains the right choice for teams that need deterministic, fast test suites with precise control over timing and mocking. Maestro is excellent for mobile teams who want YAML-driven flows without the Detox build overhead. Mobile Tester Agent earns its place when your pain point is selector maintenance or when you need to hand test authorship to non-engineers.</p>

<h2>Limitations to Know Upfront</h2>
<p>It would be dishonest to present this as a complete replacement for established testing tools. Mobile Tester Agent is early software, and a few limitations matter in practice.</p>

<p>Execution speed is the most significant one. Each step in a scenario requires a screenshot capture, a round-trip to the vision model's API, and a response to parse before the next action is taken. On a fast network, individual steps take roughly one to two seconds. A scenario with fifteen steps can take thirty seconds or more to complete. For a large test suite that Detox might finish in two minutes, the agent could take twenty. This matters in CI environments where pipeline time has a real cost.</p>

<p>The tool also requires an external API key for the vision model, which introduces a network dependency and an ongoing cost. For teams with strict data residency requirements, sending screenshots of your app's UI to an external model endpoint may require legal review. Callstack has indicated that on-premise and self-hosted model options are on the roadmap, but they are not available at time of writing.</p>

<p>Finally, the CI/CD integration story is still developing. GitHub Actions support exists but is not as polished as Detox's mature ecosystem of cloud runners and caching strategies. Expect to do some configuration work to get reliable pipeline runs today.</p>

<h2>The Future of Mobile QA</h2>
<p>What excites me most about Mobile Tester Agent is not what it does today but what it represents architecturally. Selector-based testing has always had a fundamental problem: it couples your test suite to your implementation details. Every UI refactor — renaming a component, restructuring a screen, updating a design system — breaks tests that were perfectly valid from a user's perspective. Developers spend time fixing tests rather than fixing bugs.</p>

<p>Visual AI testing decouples the test from the implementation. The scenario "log in and verify the user's name is displayed" remains valid whether you restructure your navigation, rename your components, or migrate from one UI library to another. The agent adapts; the test doesn't need to be rewritten. For small teams where a single developer is simultaneously the engineer, the QA engineer, and the release manager, eliminating that maintenance burden is genuinely valuable.</p>

<p>I also think the natural language interface unlocks a different kind of test coverage. In my experience, engineers write tests for paths they've already thought about. Product managers and QA specialists think about edge cases from a user's perspective and often surface scenarios that engineers wouldn't think to automate. If both groups can write test scenarios without learning a testing framework, coverage improves across the board.</p>

<h2>Getting Started</h2>
<p>If you want to try Mobile Tester Agent on an existing React Native or Expo project, the path is low-friction enough to justify a few hours of experimentation even before committing to it as a primary testing strategy.</p>

<p>Start by identifying two or three critical user flows in your app — authentication, your core purchase or conversion flow, and onboarding are good candidates. Write those flows as plain English scenarios. Run the agent against your development build on a simulator. Review the screenshot trail it produces for each step and compare the agent's interpretation of your UI against your own understanding of it.</p>

<p>That review process is itself valuable independent of the test results. Watching an AI navigate your app the way a first-time user would exposes assumption gaps in your UI that you've become blind to through familiarity. In one session I discovered that our loading state on the cart screen was ambiguous enough that the agent — and presumably real users — couldn't tell whether the app was processing a request or had silently failed.</p>

<p>Mobile Tester Agent is available through Callstack's tooling ecosystem. Check the official Callstack GitHub organisation and their documentation site for the latest installation instructions, as the package is under active development and the setup details are evolving rapidly. For small teams who can't staff a dedicated QA function, it's one of the more promising tools to emerge in the React Native ecosystem this year.</p>`,
  },
  {
    slug: "expo-eas-build-update-guide",
    title:
      "EAS Build and EAS Update: The Complete Guide to Shipping React Native Apps in 2025",
    description:
      "Master Expo's EAS Build for cloud-native iOS and Android builds and EAS Update for instant over-the-air updates — the modern way to ship React Native apps.",
    date: "2025-03-13",
    category: "React Native",
    readTime: "9 min read",
    sections: [
      "What Is EAS?",
      "EAS Build vs Local Builds",
      "Setting Up EAS Build",
      "Build Profiles",
      "Code Signing Made Easy",
      "EAS Update for OTA",
      "Update Channels and Branches",
      "Rollbacks and Monitoring",
      "CI/CD Integration",
      "Pricing and Limits",
    ],
    mediumLink: null,
    content: `<p>Shipping a React Native app used to mean wrestling with Xcode on a MacBook, managing Android keystores in a shared Dropbox folder, and crossing your fingers every time you triggered a release build. EAS — Expo Application Services — changes that calculus entirely. In my team, we moved from a brittle local build setup to EAS Build and EAS Update about eighteen months ago, and we've never looked back. This guide covers everything I've learned: how the tooling works, how to configure it for real projects, and how to integrate it into a proper CI/CD pipeline.</p>

<h2>What Is EAS?</h2>
<p>EAS is Expo's suite of cloud services for React Native apps. It sits at three layers of the delivery pipeline: <strong>EAS Build</strong> (compile your app in the cloud), <strong>EAS Submit</strong> (upload the resulting binary to the App Store or Play Store), and <strong>EAS Update</strong> (push JavaScript bundle updates to users without a store release). This guide focuses on Build and Update because they address the two most painful parts of mobile delivery: reproducible native builds and the agonising wait for app store review.</p>

<p>EAS works with both the Expo managed workflow and bare React Native projects. You do not need to use the managed workflow to benefit from cloud builds — any React Native project with an <code>app.json</code> or <code>app.config.js</code> can use EAS Build.</p>

<h2>EAS Build vs Local Builds</h2>
<p>The case for cloud builds is stronger than it might appear on the surface. The obvious benefit is platform coverage: you cannot run <code>npx expo run:ios</code> on a Linux or Windows machine without a remote Mac. But even on macOS, local builds carry hidden costs.</p>

<ul>
  <li><strong>Environment drift.</strong> "Works on my machine" is a cliche because it's real. A teammate's Xcode version, CocoaPods cache, or Gradle wrapper can produce a build that differs from yours in ways that are nearly impossible to debug retroactively.</li>
  <li><strong>Local SDK bloat.</strong> A full Android SDK installation with multiple NDK versions, emulator images, and build tools consumes 30–50 GB of disk space and requires constant maintenance as the toolchain evolves.</li>
  <li><strong>Credential chaos.</strong> iOS provisioning profiles and distribution certificates expire, rotate, and need to be shared across a team. Managing this manually in a shared password manager is error-prone and insecure.</li>
  <li><strong>Machine contention.</strong> Running an iOS simulator build locally ties up your CPU for several minutes. On a cloud runner, that build happens in parallel without interrupting your development flow.</li>
</ul>

<p>EAS Build eliminates all of these problems. The build runs on Expo's managed infrastructure — a macOS VM for iOS, a Linux VM for Android — with pinned Xcode and Gradle versions defined in your configuration. Every developer on the team triggers the same environment with the same command.</p>

<h2>Setting Up EAS Build</h2>
<p>I typically set up EAS Build on the first day of a new project. The process takes about fifteen minutes and the configuration lives in version control alongside the rest of the codebase.</p>

<p>Start by installing the EAS CLI globally:</p>
<pre><code>npm install -g eas-cli</code></pre>

<p>Authenticate with your Expo account:</p>
<pre><code>eas login</code></pre>

<p>Then run the interactive configuration wizard from your project root:</p>
<pre><code>eas build:configure</code></pre>

<p>This command inspects your project, asks a few questions about your setup, and generates an <code>eas.json</code> file at the project root. Here is a real <code>eas.json</code> that I use as a starting template:</p>

<pre><code>{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": false
      },
      "channel": "development"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release"
      },
      "android": {
        "buildType": "apk"
      },
      "channel": "staging"
    },
    "production": {
      "ios": {
        "buildConfiguration": "Release"
      },
      "android": {
        "buildType": "aab"
      },
      "channel": "production"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "you@example.com",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./google-services-key.json",
        "track": "internal"
      }
    }
  }
}</code></pre>

<p>Once the file is in place, trigger a build with:</p>
<pre><code># iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production

# Both platforms simultaneously
eas build --platform all --profile production</code></pre>

<p>EAS prints a URL you can share with teammates to monitor the build's progress. The resulting artifact — an IPA for iOS or an AAB/APK for Android — is stored on Expo's servers and can be downloaded, shared, or submitted directly from the dashboard.</p>

<h2>Build Profiles</h2>
<p>Build profiles are the core of <code>eas.json</code>. Each profile is a named configuration that controls how the binary is compiled, signed, and distributed. The three-profile pattern I use maps directly to a real delivery workflow.</p>

<h3>Development Profile</h3>
<p>The <code>development</code> profile builds a <strong>dev client</strong> — a custom Expo Go-style app that includes your project's native modules. This is what your engineers install on their physical devices to work against the Metro bundler during development. Setting <code>developmentClient: true</code> and <code>distribution: "internal"</code> tells EAS to sign the app for internal distribution rather than the App Store, which skips the submission review process entirely.</p>

<h3>Preview Profile</h3>
<p>The <code>preview</code> profile produces a release build for internal testing — stakeholders, QA engineers, and product managers. On iOS it uses <code>distribution: "internal"</code> with ad-hoc provisioning, which means the device UDID must be registered in your Apple Developer account. On Android, building as an APK (rather than an AAB) makes it easy to sideload directly without going through the Play Store.</p>

<h3>Production Profile</h3>
<p>The <code>production</code> profile builds for store submission. On Android this means an AAB, which the Play Store requires for all new apps. On iOS it uses App Store distribution signing. The <code>channel: "production"</code> setting ties this build to the production OTA update channel — more on that shortly.</p>

<h2>Code Signing Made Easy</h2>
<p>Code signing is the most error-prone step in traditional mobile CI/CD. EAS abstracts it almost entirely. The first time you run <code>eas build --platform ios</code>, EAS asks whether you want to manage credentials yourself or let EAS handle them. In nearly every project I work on, I choose managed credentials.</p>

<p>With <strong>managed credentials</strong>, EAS generates and stores your iOS distribution certificate and provisioning profile in Expo's encrypted credential storage. For Android, it generates and stores your upload keystore. You never need to manually export a P12 file, share a keystore password in Slack, or worry about a certificate expiring silently.</p>

<p>To inspect or update your credentials at any time:</p>
<pre><code>eas credentials</code></pre>

<p>This opens an interactive menu that lets you view, rotate, or download your certificates and keystores. If you have an existing keystore from a legacy build pipeline, you can import it through the same interface. The biggest win for me has been eliminating the "where is the keystore?" conversation entirely — it lives in EAS, access-controlled by your Expo organisation membership.</p>

<h2>EAS Update for OTA</h2>
<p>EAS Update solves a specific and painful problem: once a native binary is in users' hands, fixing a JavaScript bug requires a full app store submission, a review period that ranges from hours to days, and a gradual rollout before most users see the fix. EAS Update bypasses that entirely for JavaScript-only changes.</p>

<p>Under the hood, EAS Update uses the <code>expo-updates</code> library. When your app launches, <code>expo-updates</code> checks a manifest endpoint hosted by Expo's CDN. If a newer update is available on the channel associated with the current build, the library downloads the new JavaScript bundle and assets in the background. On the next app launch, the new bundle runs.</p>

<p>Install the library and initialise the configuration:</p>
<pre><code>npx expo install expo-updates
eas update:configure</code></pre>

<p>Push an update to your users:</p>
<pre><code>eas update --branch production --message "Fix checkout total calculation"</code></pre>

<p>There is one critical limitation to understand: EAS Update can only deliver changes to JavaScript and assets (images, fonts, JSON files). It <strong>cannot</strong> update native code. If your fix requires a new native module, a change to <code>Info.plist</code>, a new Android permission, or a CocoaPods dependency, you need a full store release. The rule I follow: if the change would require rebuilding the native binary locally, it requires a full build through EAS and a store submission.</p>

<h2>Update Channels and Branches</h2>
<p>EAS Update uses a channel-to-branch model that maps cleanly onto a standard Git branching strategy. A <strong>channel</strong> is a named endpoint associated with a build. A <strong>branch</strong> is a named stream of updates. When you run <code>eas update</code>, you push to a branch; the channel determines which builds receive updates from that branch.</p>

<p>In my typical setup, the <code>production</code> channel in <code>eas.json</code> points to the <code>production</code> branch, and the <code>preview</code> profile points to the <code>staging</code> branch. This means:</p>

<ul>
  <li>Running <code>eas update --branch staging --message "Test new onboarding"</code> delivers the update to all devices running a preview build — without touching production users.</li>
  <li>Running <code>eas update --branch production --message "Fix cart bug"</code> delivers to all production devices immediately.</li>
</ul>

<p>To reassign a channel to a different branch — useful for a hotfix or a staged rollout:</p>
<pre><code>eas channel:edit production --branch hotfix-payment</code></pre>

<p>This is one of the most powerful operational levers in the EAS toolkit. In an incident, you can redirect the entire production channel to a known-good branch in seconds, without waiting for a store review.</p>

<h2>Rollbacks and Monitoring</h2>
<p>EAS Update tracks every update you publish. If a bad update goes out — a crash regression, a broken API integration, or a UI that doesn't render correctly on a specific device — you can roll back immediately:</p>
<pre><code>eas update:rollback --branch production</code></pre>

<p>This command republishes the previous update on the branch. Devices running <code>expo-updates</code> will receive the rollback on their next check-in, which is typically the next app launch.</p>

<p>For monitoring, EAS Insights (available on paid plans) provides update adoption metrics: what percentage of your active user base has received a given update, broken down by platform and app version. This is critical for understanding exposure during an incident. If you pushed a bad update four hours ago and Insights shows 62% adoption, you know the scope of the problem before you begin investigating.</p>

<p>I also recommend coupling EAS Update with crash reporting (Sentry or Bugsnag). Configure your crash reporter to tag events with the EAS update ID — this lets you correlate a spike in crashes directly to a specific update publication.</p>

<h2>CI/CD Integration</h2>
<p>EAS Build and EAS Update work well in isolation, but the real productivity gain comes from automating them in a CI/CD pipeline. Here is the GitHub Actions setup I use across most of my projects.</p>

<p>First, store your Expo token as a GitHub Actions secret named <code>EXPO_TOKEN</code>. Generate it from your Expo account settings.</p>

<p>Then create <code>.github/workflows/eas.yml</code>:</p>

<pre><code>name: EAS Build and Update

on:
  push:
    branches:
      - main
    tags:
      - 'v*'

jobs:
  update:
    name: EAS Update (main branch)
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: \${{ secrets.EXPO_TOKEN }}

      - name: Publish OTA update
        run: eas update --branch production --message "Deploy \${{ github.sha }}" --non-interactive

  build:
    name: EAS Build (release tag)
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: \${{ secrets.EXPO_TOKEN }}

      - name: Build iOS and Android
        run: eas build --platform all --profile production --non-interactive</code></pre>

<p>The <code>--non-interactive</code> flag is essential in CI — without it, EAS may prompt for input that the runner cannot provide. The <code>expo-github-action</code> step handles installing the EAS CLI and authenticating with your token automatically, so no manual CLI setup is required on the runner.</p>

<p>The workflow triggers an OTA update on every push to <code>main</code> (fast, no store review required), and triggers a full native build whenever you push a version tag like <code>v1.4.0</code> (for store submission).</p>

<h2>Pricing and Limits</h2>
<p>EAS Build's free tier includes 30 iOS builds and 30 Android builds per month. For small teams and solo developers, this is sufficient for a steady cadence of releases without spending anything. Builds run on shared infrastructure, which means queue times can stretch to fifteen or twenty minutes during peak hours.</p>

<p>Paid plans (starting at $99/month for teams) unlock priority build queues, which typically deliver builds in under five minutes, as well as higher monthly build limits and concurrent builds. For a team shipping weekly releases across two platforms, the time saved on queue waits alone justifies the cost.</p>

<p>EAS Update charges based on monthly active users (MAUs) receiving updates. The free tier covers up to 1,000 MAUs, which is generous for early-stage apps. Bandwidth costs kick in above that threshold at a rate that is competitive with running your own CDN-backed update server — and you get the managed infrastructure and Insights dashboard without any operational overhead.</p>

<p>My recommendation: start on the free tier, validate the workflow, and upgrade to a paid build plan when queue times start to affect your team's deployment cadence. The transition is seamless — there are no configuration changes required when you upgrade, only faster queues and higher limits.</p>`,
  },
];

export const getBlogBySlug = (slug) => blogPosts.find((p) => p.slug === slug);
