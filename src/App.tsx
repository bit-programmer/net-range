import { useState } from 'react';
import Section from './components/Section';

function App() {
  const [ip, setIp] = useState('');
  const [netmask, setNetmask] = useState('');

  // Extended Form State
  const [addressType, setAddressType] = useState('');
  const [range, setRange] = useState('');
  const [availableIps, setAvailableIps] = useState('');
  const [networkAddr, setNetworkAddr] = useState('');
  const [broadcastAddr, setBroadcastAddr] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseCode, setResponseCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleConnect = async () => {
    // Basic validation
    if (!ip || !netmask) {
      setError('IP and Netmask are required.');
      return;
    }

    setStatus('loading');
    setError(null);
    setValidationErrors([]);

    try {
      const response = await fetch('https://vulerability-engine.vercel.app/ip-address-ranges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip,
          netmask,
          type: addressType,
          ranges: range,
          available: availableIps.replace(/,/g, ''), // Sanitize for number conversion
          network: networkAddr,
          broadcast: broadcastAddr
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResponseCode(data.code);
        setStatus('success');
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          setValidationErrors(data.errors);
          throw new Error('Validation failed'); // Trigger catch block but distinct handling
        } else {
          throw new Error(data.message || 'Server connection refused.');
        }
      }
    } catch (err: any) {
      setStatus('error');
      if (err.message !== 'Validation failed') {
        setError(err.message || 'Connection failed.');
      }
    }
  };

  const copyToClipboard = () => {
    if (responseCode) {
      navigator.clipboard.writeText(responseCode);
    }
  };

  return (
    <div className="h-full w-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar">

      {/* Page 1: Home */}
      <Section title="" id="home" className="relative">
        <div className="animate-fade-in-up">
          <div className="font-mono-art text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-primarycolor font-bold leading-none mb-8 opacity-80 select-none hidden md:block">
            {` _   _  _____  _____   ____      _    _   _   ____  _____ 
| \\ | || ____||_   _| |  _ \\    / \\  | \\ | | / ___|| ____|
|  \\| ||  _|    | |   | |_) |  / _ \\ |  \\| || |  _ |  _|  
| |\\  || |___   | |   |  _ <  / ___ \\| |\\  || |_| || |___ 
|_| \\_||_____|  |_|   |_| \\_\\/_/   \\_\\_| \\_||____||_____|`}
          </div>
          {/* Mobile-only simple header since ASCII is too wide */}
          <h1 className="md:hidden text-6xl font-bold text-primarycolor mb-6 tracking-tighter">NET<br />RANGE</h1>

          <p className="text-xl md:text-2xl font-light max-w-2xl delay-100">
            Welcome to <span className="text-white font-semibold">Net Range</span>.
          </p>
          <p className="text-lg text-textcolor/60 mt-4 max-w-xl delay-200">
            The next generation of network visualization.
          </p>

          <div className="mt-12 animate-float delay-300">
            <p className="text-sm uppercase tracking-widest text-primarycolor/70 mb-2">Scroll to Explore</p>
            <span className="text-2xl text-primarycolor">→</span>
          </div>
        </div>
      </Section>

      {/* Page 2: Terminal Setup */}
      <Section title="" className="relative">
        <div className="animate-fade-in-up">
          <div className="font-mono-art text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-primarycolor font-bold leading-none mb-8 opacity-80 select-none hidden md:block">
            {` _____  _____  ____   __  __  ___  _   _    _    _     
|_   _|| ____||  _ \\ |  \\/  ||_ _|| \\ | |  / \\  | |    
  | |  |  _|  | |_) || |\\/| | | | |  \\| | / _ \\ | |    
  | |  | |___ |  _ < | |  | | | | | |\\  |/ ___ \\| |___ 
|_|  |_____||_| \\_\\|_|  |_||___||_| \\_/_/   \\_\\_____|
 ____   _____  _____  _   _  ____  
/ ___| | ____||_   _|| | | ||  _ \\ 
\\___ \\ |  _|    | |  | | | || |_) |
 ___) || |___   | |  | |_| ||  __/ 
|____/ |_____|  |_|   \\___/ |_|    `}
          </div>
          {/* Mobile-only header */}
          <h1 className="md:hidden text-5xl font-bold text-primarycolor mb-6 tracking-tighter">TERMINAL<br />SETUP</h1>

          <p className="mb-6 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            To access the full power of Net Range, you need to open your system terminal.
          </p>

          <div className="bg-black/40 p-6 rounded border border-white/10 font-mono text-sm leading-relaxed max-w-2xl">
            {navigator.userAgent.indexOf("Mac") !== -1 ? (
              <>
                <h3 className="text-primarycolor font-bold mb-2 tracking-wider">MACOS INSTRUCTIONS</h3>
                <ol className="list-decimal list-inside space-y-2 text-textcolor/80">
                  <li>Press <span className="text-white font-bold">Cmd + Space</span> to open Spotlight.</li>
                  <li>Type <span className="text-white font-bold">Terminal</span> and press Enter.</li>
                  <li>Or go to <span className="italic">Applications &gt; Utilities &gt; Terminal</span>.</li>
                </ol>
              </>
            ) : (
              <>
                <h3 className="text-primarycolor font-bold mb-2 tracking-wider">WINDOWS INSTRUCTIONS</h3>
                <ol className="list-decimal list-inside space-y-2 text-textcolor/80">
                  <li>Press <span className="text-white font-bold">Win + R</span> to open Run.</li>
                  <li>Type <span className="text-white font-bold">cmd</span> or <span className="text-white font-bold">powershell</span>.</li>
                  <li>Press <span className="text-white font-bold">Enter</span> to launch.</li>
                </ol>
              </>
            )}
          </div>

          <p className="mt-8 text-sm opacity-60 font-mono">
            &gt; Awaiting connection...
          </p>

          <div className="mt-12 animate-float delay-300">
            <p className="text-sm uppercase tracking-widest text-primarycolor/70 mb-2">Scroll for Capabilities</p>
            <span className="text-2xl text-primarycolor">→</span>
          </div>
        </div>
      </Section>

      {/* Page 3: Execute Command */}
      <Section title="" className="relative">
        <div className="animate-fade-in-up">
          <div className="font-mono-art text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-primarycolor font-bold leading-none mb-8 opacity-80 select-none hidden md:block">
            {` _____ __  __ _____  ____  _   _  _____  _____ 
| ____|\\ \\/ /| ____|/ ___|| | | ||_   _|| ____|
|  _|   \\  / |  _| | |    | | | |  | |  |  _|  
| |___  /  \\ | |___| |___ | |_| |  | |  | |___ 
|_____|/_/\\_\\|_____|\\____| \\___/   |_|  |_____|`}
          </div>
          <h1 className="md:hidden text-5xl font-bold text-primarycolor mb-6 tracking-tighter">EXECUTE</h1>

          <p className="mb-8 font-light text-xl">
            Identify your network configuration by running the standard diagnostic command.
          </p>

          <div className="bg-black/80 rounded-lg overflow-hidden border border-white/10 shadow-2xl max-w-2xl">
            <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="flex">
                <span className="text-green-400 mr-2">➜</span>
                <span className="text-white">
                  {navigator.userAgent.indexOf("Mac") !== -1 ? "ifconfig" : "ipconfig"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 animate-float delay-300">
            <p className="text-sm uppercase tracking-widest text-primarycolor/70 mb-2">Next: Identify</p>
            <span className="text-2xl text-primarycolor">→</span>
          </div>
        </div>
      </Section>

      {/* Page 4: Critical Interfaces */}
      <Section title="" className="relative">
        <div className="animate-fade-in-up">
          <div className="font-mono-art text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-primarycolor font-bold leading-none mb-8 opacity-80 select-none hidden md:block">
            {` ___  ____  _____  _   _  _____  ___  _____ __   __
|_ _||  _ \\| ____|| \\ | ||_   _||_ _||  ___|\\ \\ / /
 | | | | | ||  _|  |  \\| |  | |   | | | |_    \\ V / 
 | | | |_| || |___ | |\\  |  | |   | | |  _|    | |  
|___||____/ |_____||_| \\_|  |_|  |___||_|      |_|  `}
          </div>
          <h1 className="md:hidden text-5xl font-bold text-primarycolor mb-6 tracking-tighter">IDENTIFY</h1>

          <div className="space-y-6 max-w-3xl">
            {navigator.userAgent.indexOf("Mac") !== -1 ? (
              <>
                <p className="mb-8 font-light text-xl">
                  On macOS, pay close attention to <span className="text-primarycolor font-mono font-bold">en0</span> and <span className="text-primarycolor font-mono font-bold">en1</span>.
                </p>
                <div className="group hover:bg-white/5 p-6 rounded transition-all cursor-default">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-mono font-bold text-primarycolor">en0</span>
                    <span className="uppercase text-xs tracking-widest opacity-50">Primary Interface</span>
                  </div>
                  <p className="opacity-80 leading-relaxed">
                    Usually your main connection. On MacBooks, this is often the <span className="text-white font-semibold">Wi-Fi</span> interface.
                  </p>
                </div>

                <div className="group hover:bg-white/5 p-6 rounded transition-all cursor-default">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-mono font-bold text-primarycolor">en1</span>
                    <span className="uppercase text-xs tracking-widest opacity-50">Secondary Interface</span>
                  </div>
                  <p className="opacity-80 leading-relaxed">
                    Typically the Ethernet port or Thunderbolt bridge. If `en0` is Wi-Fi, `en1` handles wired connections.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="mb-8 font-light text-xl">
                  On Windows, look for <span className="text-primarycolor font-mono font-bold">Wireless LAN</span> or <span className="text-primarycolor font-mono font-bold">Ethernet</span> adapter.
                </p>
                <div className="group hover:bg-white/5 p-6 rounded transition-all cursor-default">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-mono font-bold text-primarycolor">Wi-Fi</span>
                    <span className="uppercase text-xs tracking-widest opacity-50">Wireless Interface</span>
                  </div>
                  <p className="opacity-80 leading-relaxed">
                    Listed as <span className="text-white font-semibold">"Wireless LAN adapter Wi-Fi"</span>. This is your primary wireless connection.
                  </p>
                </div>

                <div className="group hover:bg-white/5 p-6 rounded transition-all cursor-default">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-3xl font-mono font-bold text-primarycolor">Ethernet</span>
                    <span className="uppercase text-xs tracking-widest opacity-50">Wired Interface</span>
                  </div>
                  <p className="opacity-80 leading-relaxed">
                    Listed as <span className="text-white font-semibold">"Ethernet adapter Ethernet"</span>. Used for wired LAN connections.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-12 animate-float delay-300">
            <p className="text-sm uppercase tracking-widest text-primarycolor/70 mb-2">Next: Analysis</p>
            <span className="text-2xl text-primarycolor">→</span>
          </div>
        </div>
      </Section>

      {/* Page 5: Understanding Interfaces */}
      <Section title="" className="relative">
        <div className="animate-fade-in-up">
          <div className="font-mono-art text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-primarycolor font-bold leading-none mb-8 opacity-80 select-none hidden md:block">
            {`    _    _   _     _    _  __   __ _____  _____ 
   / \\  | \\ | |   / \\  | | \\ \\ / /|__  / | ____|
  / _ \\ |  \\| |  / _ \\ | |  \\ V /   / /  |  _|  
 / ___ \\| |\\  | / ___ \\| |___| |   / /_  | |___ 
/_/   \\_\\_| \\_|/_/   \\_\\_____|_|  /____| |_____|`}
          </div>
          <h1 className="md:hidden text-5xl font-bold text-primarycolor mb-6 tracking-tighter">ANALYZE</h1>

          <p className="mb-6 font-light text-xl">
            Locate your <span className="text-white font-semibold">IPv4 Address</span> and <span className="text-white font-semibold">Netmask</span> in the output.
          </p>

          {/* Example Output Box */}
          <div className="bg-black/80 rounded border border-white/10 p-4 font-mono text-xs md:text-sm text-gray-400 mb-8 max-w-2xl overflow-x-auto">
            <div className="opacity-50 mb-2">// Example Output ({navigator.userAgent.indexOf("Mac") !== -1 ? "macOS" : "Windows"})</div>
            {navigator.userAgent.indexOf("Mac") !== -1 ? (
              <>
                <div className="mb-1">en0: flags=8863&lt;UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST&gt; mtu 1500</div>
                <div className="mb-1 pl-4">options=6463&lt;RXCSUM,TXCSUM,TSO4,TSO6,CHANNEL_IO,PARTIAL_CSUM,ZEROINVERT_CSUM&gt;</div>
                <div className="mb-1 pl-4">ether a4:83:e7:5d:22:11 </div>
                <div className="mb-1 pl-4 text-white bg-primarycolor/20 inline-block rounded px-1">inet 192.168.1.45 netmask 0xffffff00 broadcast 192.168.1.255</div>
                <div className="pl-4">media: autoselect</div>
                <div className="pl-4">status: active</div>
              </>
            ) : (
              <>
                <div className="mb-1">Wireless LAN adapter Wi-Fi:</div>
                <div className="mb-1 pl-4">Connection-specific DNS Suffix  . : localdomain</div>
                <div className="mb-1 pl-4 text-white bg-primarycolor/20 inline-block rounded px-1">IPv4 Address. . . . . . . . . . . : 192.168.1.45</div>
                <div className="mb-1 pl-4 text-white bg-primarycolor/20 inline-block rounded px-1">Subnet Mask . . . . . . . . . . . : 255.255.255.0</div>
                <div className="pl-4">Default Gateway . . . . . . . . . : 192.168.1.1</div>
              </>
            )}
          </div>

          <p className="mb-8 leading-relaxed max-w-3xl opacity-80">
            The <span className="text-primarycolor font-mono">inet</span> (or IPv4) address is your device's identity on the network. The <span className="text-primarycolor font-mono">netmask</span> defines the size of the network.
          </p>

          <div className="mt-12 animate-float delay-300">
            <p className="text-sm uppercase tracking-widest text-primarycolor/70 mb-2">Final Step: Connect</p>
            <span className="text-2xl text-primarycolor">→</span>
          </div>
        </div>
      </Section>

      {/* Page 6: Connect */}
      <Section title="" className="relative">
        <div className="animate-fade-in-up">


          {responseCode ? (
            <div className="animate-fade-in-up text-center max-w-2xl mx-auto">
              <div className="text-6xl text-success mb-4 text-shadow-glow">✓</div>
              <h2 className="text-4xl font-bold text-white mb-6">CONNECTION ESTABLISHED</h2>

              <div className="bg-white/10 p-8 rounded font-mono text-xl mb-4 border border-success/30 relative group">
                <div className="opacity-50 text-sm mb-2">ACCESS CODE</div>
                <div className="text-success font-bold tracking-[0.2em] break-all">{responseCode}</div>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 text-xs bg-white/10 hover:bg-white/20 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider"
                >
                  Copy
                </button>
              </div>

              <button
                onClick={() => { setResponseCode(null); setStatus('idle'); setIp(''); setNetmask(''); setValidationErrors([]); }}
                className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/30"
              >
                Initialize New Connection
              </button>
            </div>
          ) : status === 'error' && validationErrors.length > 0 ? (
            <div className="animate-fade-in-up text-center max-w-2xl mx-auto bg-black/80 border border-error/50 p-8 rounded-lg shadow-[0_0_30px_rgba(255,0,85,0.2)]">
              <div className="text-6xl text-error mb-4">⚠</div>
              <h2 className="text-3xl font-bold text-white mb-6">DIAGNOSTIC ERRORS DETECTED</h2>

              <div className="text-left bg-white/5 p-6 rounded space-y-3 mb-8 font-mono text-sm max-h-60 overflow-y-auto">
                {validationErrors.map((err, idx) => (
                  <div key={idx} className="flex gap-3 text-white/90">
                    <span className="text-error">✖</span>
                    <span>{err}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-error text-white font-bold uppercase tracking-wider text-sm hover:bg-red-600 transition-colors"
              >
                Retry Diagnosis
              </button>
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto">
              <div className="font-mono-art text-[0.6rem] sm:text-xs md:text-sm lg:text-base text-primarycolor font-bold leading-none mb-8 opacity-80 select-none hidden md:block">
                {`  ____   ___   _   _  _   _  _____  ____  _____ 
 / ___| / _ \\ | \\ | || \\ | || ____|/ ___||_   _|
| |    | | | ||  \\| ||  \\| ||  _| | |      | |  
| |___ | |_| || |\\  || |\\  || |___| |___   | |  
 \\____| \\___/ |_| \\_||_| \\_||_____|\\____|  |_|  `}
              </div>
              <h1 className="md:hidden text-5xl font-bold text-primarycolor mb-6 tracking-tighter">CONNECT</h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Form Column */}
                <div>
                  <p className="text-xl mb-8">
                    Enter your network configuration to initialize the connection.
                  </p>
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-primarycolor text-xs uppercase tracking-widest font-bold mb-2">IPv4 Address</label>
                      <input
                        type="text"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="e.g. 192.168.1.45"
                        className="w-full bg-black/40 border border-white/20 p-4 text-white font-mono focus:border-primarycolor focus:outline-none focus:ring-1 focus:ring-primarycolor transition-all placeholder:opacity-30"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-primarycolor text-xs uppercase tracking-widest font-bold mb-2">Netmask</label>
                      <input
                        type="text"
                        value={netmask}
                        onChange={(e) => setNetmask(e.target.value)}
                        placeholder="e.g. 255.255.255.0"
                        className="w-full bg-black/40 border border-white/20 p-4 text-white font-mono focus:border-primarycolor focus:outline-none focus:ring-1 focus:ring-primarycolor transition-all placeholder:opacity-30"
                      />
                    </div>

                    <button
                      onClick={handleConnect}
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-primarycolor text-secondarycolor font-bold rounded-none hover:bg-white transition-all cursor-pointer uppercase tracking-wider text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'ESTABLISHING HANDSHAKE...' : 'CONNECT'}
                    </button>
                    {error && <div className="text-error font-mono text-sm mt-2">{error}</div>}
                  </div>
                </div>

                {/* Analysis Column (Now Manual/Auto Input) */}
                <div className="font-mono text-sm border-l border-white/10 pl-8 pt-2 hidden lg:block">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-xs opacity-40 uppercase tracking-widest">NETWORK DIAGNOSTICS</div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-1">
                      <label className="opacity-50 text-xs block uppercase">[ TYPE OF ADDRESS ]</label>
                      <input
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        placeholder="e.g. Private"
                        className="bg-transparent border-b border-white/10 text-white focus:border-primarycolor focus:outline-none w-full py-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="opacity-50 text-xs block uppercase">[ RANGES ]</label>
                      <input
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        placeholder="e.g. 192.168.0.0 to 192.168.255.255"
                        className="bg-transparent border-b border-white/10 text-white focus:border-primarycolor focus:outline-none w-full py-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="opacity-50 text-xs block uppercase">[ AVAILABLE IP ADDRESSES ]</label>
                      <input
                        value={availableIps}
                        onChange={(e) => setAvailableIps(e.target.value)}
                        placeholder="e.g. 65,534"
                        className="bg-transparent border-b border-white/10 text-white focus:border-primarycolor focus:outline-none w-full py-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="opacity-50 text-xs block uppercase">[ NETWORK ADDRESS ]</label>
                      <input
                        value={networkAddr}
                        onChange={(e) => setNetworkAddr(e.target.value)}
                        placeholder="e.g. 192.168.0.0"
                        className="bg-transparent border-b border-white/10 text-white focus:border-primarycolor focus:outline-none w-full py-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="opacity-50 text-xs block uppercase">[ BROADCAST ADDRESS ]</label>
                      <input
                        value={broadcastAddr}
                        onChange={(e) => setBroadcastAddr(e.target.value)}
                        placeholder="e.g. 192.168.255.255"
                        className="bg-transparent border-b border-white/10 text-primarycolor focus:border-primarycolor focus:outline-none w-full py-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile View with Inputs */}
                <div className="lg:hidden space-y-4 border-t border-white/10 pt-6 mt-6">
                  <input
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                    placeholder="Address Type"
                    className="w-full bg-black/40 border border-white/20 p-2 text-white text-sm"
                  />
                  <input
                    value={networkAddr}
                    onChange={(e) => setNetworkAddr(e.target.value)}
                    placeholder="Network Address"
                    className="w-full bg-black/40 border border-white/20 p-2 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}


          <p className="mt-20 text-xs opacity-30 font-mono">
            SYSTEM_ID: NR-2025-ALPHA // STATUS: {status === 'success' ? 'CONNECTED' : 'WAITING'}
          </p>
        </div>
      </Section>

    </div>
  );
}

export default App;
