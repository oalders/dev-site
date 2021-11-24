import Example from 'gatsby-theme-maxmind/components/Example';
import * as React from 'react';

// eslint-disable-next-line max-len
import MaxMindIpAddresses from '../../../static/maxmind-server-ip-addresses.json';

const IpAddresses: React.FC = () => (
  <Example
    language="bash"
  >
    {MaxMindIpAddresses.IPv4.join('\n')}
    {'\n'}
    {MaxMindIpAddresses.IPv6.join('\n')}
  </Example>
);

export default IpAddresses;
