import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"
import Header from "./header"

const Layout = ({ children }: React.PropsWithChildren) => { // we are using typescript so we add type propswith children
  return (
    <ThemedLayoutV2 
      Header={Header}
      Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine" />}
    >
      {children}
    </ThemedLayoutV2>
  )
}

export default Layout